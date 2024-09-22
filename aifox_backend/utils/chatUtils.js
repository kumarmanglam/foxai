const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

require("dotenv").config();
const client = new MongoClient(process.env.MONGO_URL);
// const hfToken = process.env.HF_TOKEN;
// const embeddingUrl = process.env.EMBEDDING_URL;
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyDe - o_KL1umfUHv31Ol2VPWI6iy7AfF3aM");
const hfToken = "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";
const embeddingUrl = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AZURE_OPENAI_API_KEY = "fa57c768e4a8407f9c87017e0360a98a"
const AZURE_OPENAI_ENDPOINT = "https://foxaiproject.openai.azure.com/"
const AZURE_DEPLOYMENT_ID = "text-embedding-ada-002"
const URL = "https://foxaiproject.openai.azure.com/openai/deployments/text-embedding-ada-002/embeddings?api-version=2023-05-15"


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

async function generateAnswer(query, context) {
    try {
        let prompt = `Answer the following question strictly based on the given context... \n${context.join('\n')}\nQuestion: ${query}\nAnswer:`;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error(`Error generating answer with Gemini Flash: ${error.message}`);
        throw error;
    }
}

async function retrieveAnswer(query, history, pdf_id) {
    try {
        console.log({ query });
        const queryEmbedding = await generateEmbedding(query);
        const searchResults = await searchWithEmbedding(queryEmbedding, pdf_id);
        const context = searchResults.map(result => result.text);
        console.log(context);
        if (context.length > 0) {
            const answer = await generateAnswer(query, context);
            return answer;
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
