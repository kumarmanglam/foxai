const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

require("dotenv").config();
const client = new MongoClient(process.env.MONGO_URL);
// const hfToken = process.env.HF_TOKEN;
// const embeddingUrl = process.env.EMBEDDING_URL;
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyDe - o_KL1umfUHv31Ol2VPWI6iy7AfF3aM");
const hfToken = "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";
const embeddingUrl = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
async function generateEmbedding(text) {
    try {
        const response = await axios.post(
            embeddingUrl,
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${hfToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error("Unexpected embedding response format");
        }
    } catch (error) {
        console.error(`Failed to generate embedding: ${error.message}`);
        throw error;
    }
}

async function searchWithEmbedding(embedding) {
    const dbName = 'gen-ai';
    const collectionName = 'embeddings';

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
        let prompt = `Answer the following question based on the given context... \n${context.join('\n')}\nQuestion: ${query}\nAnswer:`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error(`Error generating answer with Gemini Flash: ${error.message}`);
        throw error;
    }
}

async function retrieveAnswer(query) {
    try {
        console.log({ query });
        const queryEmbedding = await generateEmbedding(query);
        const searchResults = await searchWithEmbedding(queryEmbedding);
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
};
