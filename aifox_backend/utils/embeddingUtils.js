const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios');

require("dotenv").config();
const hfToken = process.env.HF_TOKEN;
const embeddingUrl = process.env.EMBEDDING_URL;

// Extract text from PDF
async function extractPDFText(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdf(dataBuffer);
        console.log(`Text extracted from PDF at ${pdfPath}`);
        return pdfData.text;
    } catch (error) {
        console.error(`Error extracting text from PDF: ${error.message}`);
        throw error;
    }
}

// Split text into chunks
function splitTextIntoChunks(text) {
    const chunkSize = 2250;
    const chunkOverlap = 50;
    const totalLength = text.length;
    const chunks = [];

    for (let i = 0; i < totalLength; i += chunkSize - chunkOverlap) {
        const chunk = text.substring(i, Math.min(i + chunkSize, totalLength));
        chunks.push(chunk);
    }
    console.log(`Text split into ${chunks.length} chunks.`);
    return chunks;
}

// Generate embeddings with retry mechanism
async function generateEmbeddingWithRetry(text, retries = 5, initialDelay = 2000) {
    let delay = initialDelay;
    for (let i = 0; i < retries; i++) {
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
            console.log('Embedding generated successfully.');
            return response.data;
        } catch (error) {
            console.error(`Error generating embedding: ${error.message}`);
            if (error.response && error.response.status === 429 && i < retries - 1) {
                console.log(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
    throw new Error('Max retries reached while generating embeddings.');
}

// Save data to MongoDB
async function saveDataToMongo(data, collection) {
    for (const item of data) {
        try {
            const embedding = await generateEmbeddingWithRetry(item.text);
            const document = {
                text: item.text,
                source: item.source,
                embeddings: embedding,
            };
            await collection.insertOne(document);
            console.log(`Inserted document for chunk from ${item.source}`);
            // Delay between API calls to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to process chunk from ${item.source}: ${error.message}`);
        }
    }
}

// Process PDF
async function processPDF(pdfFilePath, documentName, collection) {
    try {
        console.log(`Processing PDF at path: ${pdfFilePath}`);

        const pdfText = await extractPDFText(pdfFilePath);
        const textChunks = splitTextIntoChunks(pdfText);

        const data = textChunks.map(chunk => ({
            text: chunk,
            source: documentName, // Use the document name passed from the controller
        }));

        await saveDataToMongo(data, collection);
        console.log('PDF processing and embedding completed successfully.');
    } catch (error) {
        console.error(`Error processing PDF: ${error.message}`);
    }
}

module.exports = {
    processPDF
};
