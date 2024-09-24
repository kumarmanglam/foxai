const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios');

require("dotenv").config({ path: '../.env' });

const { generateEmbedding } = require('./chatUtils.js');

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

async function saveDataToMongo(data, collection) {
    for (const item of data) {
        try {

            const embedding = await generateEmbedding(item.text);
            const document = {
                text: item.text,
                source: item.source,
                pdf_id: item.pdf_id,
                embeddings: embedding,
            };

            const result = await collection.insertOne(document);
            if (result.acknowledged) {
                console.log("inserted ")
            } else {
                console.log(("failed to insert the documents"))
            }
            console.log(`Inserted document for chunk from ${item.source}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to process chunk from ${item.source}: ${error.message}`);
        }
    }
}

async function processPDF(pdfFilePath, documentName, collection, pdf_id) {
    try {
        const pdfText = await extractPDFText(pdfFilePath);
        const textChunks = splitTextIntoChunks(pdfText);

        const data = textChunks.map(chunk => ({
            text: chunk,
            source: documentName,
            pdf_id: pdf_id
        }));

        await saveDataToMongo(data, collection);
        console.log('PDF processing and embedding completed successfully.');
        return true;
    } catch (error) {
        console.error(`Error processing PDF: ${error.message}`);
        return false;
    }
}

module.exports = {
    processPDF
};
