const Chats = require('../models/chatModel');
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


require("dotenv").config({ path: '../.env' });
const client = new MongoClient(process.env.MONGO_URL);

console.log(process.env.AZURE_OPENAI_API_KEY)
console.log(process.env.GOOGLE_API_KEY)
console.log(process.env.JWT_SECRET_KEY)
console.log(process.env.URL)

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY
const AZURE_OPENAI_ENDPOINT = "https://foxaiproject.openai.azure.com/"
const AZURE_DEPLOYMENT_ID = "text-embedding-ada-002"
const URL = process.env.URL

async function generateEmbedding(text) {
    try {
        const response = await axios.post(
            URL,
            {
                input: text,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': AZURE_OPENAI_API_KEY,
                },
            }
        );

        // Extract embeddings from the response
        const embeddings = response.data.data[0].embedding;
        return embeddings;
    } catch (error) {
        console.error(`Failed to generate embedding with Azure: ${error.message}`);
        throw error;
    }
}


async function searchWithEmbedding(embedding, pdf_id) {
    const dbName = 'gen-ai';
    const collectionName = 'embeddings';
    console.log({ pdf_id })


    try {
        const clientConn = await client.connect();
        const db = clientConn.db(dbName);
        const collection = db.collection(collectionName);

        const searchResults = await collection.aggregate([
            {
                $search: {
                    index: 'default',
                    knnBeta: {
                        vector: embedding,
                        path: 'embeddings',
                        k: 5,
                    }
                }
            },
            {
                $match: {

                    pdf_id: new ObjectId(pdf_id)

                }
            },
            { $limit: 5 }
        ]).toArray();

        await clientConn.close();
        return searchResults;
    } catch (error) {
        console.error(`Error during vector search: ${error.message}`);
        throw error;
    }
}

async function generateAnswer(context) {
    try {
        const result = await model.generateContent(context);
        return result.response.text();
    } catch (error) {
        console.error(`Error generating answer with Gemini Flash: ${error.message}`);
        throw error;
    }
}

async function retrieveAnswer(query, history, pdf_id, user_id) {
    console.log({ history })
    try {
        const queryEmbedding = await generateEmbedding(query);

        const searchResults = await searchWithEmbedding(queryEmbedding, pdf_id);
        console.log({ searchResults });
        const context = searchResults.map(result => JSON.stringify(result.text));
        console.log({ context: context.join("\n") })

        let historyContext = '';
        if (history && history.length > 0) {
            history.forEach(entry => {
                historyContext += `Human: ${entry.human}\nAI: ${entry.ai}\n`;
            });
        }

        let fullContext = `Answer the following question strictly based on the given context...:\n${context.join('\n')}\n This is Chat History uptil now. ${historyContext}Question: ${query}\nAnswer:`;

        if (context.length > 0 || historyContext) {
            const answer = await generateAnswer(fullContext);
            console.log({
                user_id, pdf_id
            })

            const resp = answer;
            return resp;
        } else {
            return "No relevant documents found.";
        }
    } catch (error) {
        console.error(`Error retrieving answer: ${error.message}`);
        throw error;
    }
}

module.exports = {
    retrieveAnswer,
    generateEmbedding
};
