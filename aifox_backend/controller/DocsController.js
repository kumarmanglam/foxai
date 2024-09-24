const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const Docs = require('../models/docsModel.js');

const { processPDF } = require('../utils/embeddingUtils.js');
const Embedding = require('../models/embeddingsModel.js');
const uploadedFileDir = path.join(__dirname, '../uploaded_file');



if (!fs.existsSync(uploadedFileDir)) {
  fs.mkdirSync(uploadedFileDir);
}

const uploadDocs = async (req, res) => {
  try {
    const file = req.file;
    const { department } = req.body;


    if (!file) {
      return res.status(400).send('No PDF file uploaded.');
    }
    if (!department || !['HR', 'Engineer', 'Senior Developer', 'Director'].includes(department)) {

      return res.status(400).send('Invalid department.');
    }

    const documentName = file.originalname;

    const newDocument = new Docs({
      department: department,
      docs_name: documentName,
    });

    const savedDocument = await newDocument.save();


    const pdf_id = savedDocument._id;


    const filePath = file.path;
    let flag = await processPDF(filePath, documentName, Embedding.collection, pdf_id);


    if (flag) {
      res.status(200).json({
        message: 'PDF uploaded, processed, and embeddings saved successfully.',

        documentId: pdf_id,

      });
    }
    else {
      res.status(500).send("An error occurred while uploading and processing the PDF.");
    }

  } catch (err) {
    console.error(`Error in uploadDocs: ${err.message}`);
    res.status(500).send("An error occurred while uploading and processing the PDF.");
  }
};


// http://localhost:3000/documents/deleteDocs?documentId=66ee4bb08c715aad970129ec
const deleteFile = async (req, res) => {
  const documentId = req.query.documentId;

  if (!documentId) {
    return res.status(400).send('Document ID is required.');
  }

  try {
    const doc = await Docs.findById(documentId);

    if (!doc) {
      return res.status(404).send('Document not found in the database.');
    }

    const { docs_name } = doc;

    // Construct the full file path
    const filePath = path.join(uploadedFileDir, `${docs_name}.pdf`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the document from Docs collection
    await Docs.findByIdAndDelete(documentId);

    // Delete associated embeddings from the Embeddings collection

    const deletedEmbeddings = await Embedding.deleteMany({ pdf_id: new ObjectId(documentId) });


    res.send({
      message: 'File, document, and related embeddings deleted successfully.',
      deletedEmbeddings: deletedEmbeddings.deletedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while deleting the file, document, or embeddings.');
  }
};



const getDocsByDeptController = async (req, res) => {
  try {
    const department = req.body.department;
    const docs = await Docs.find({ department });

    res.send(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving documents.' });
  }
};

const getAllDocsController = async (req, res) => {
  try {
    const docs = await Docs.find();
    res.send(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving documents.' });
  }
}

module.exports = {
  uploadDocs,
  deleteFile,
  getDocsByDeptController,
  getAllDocsController,
};

