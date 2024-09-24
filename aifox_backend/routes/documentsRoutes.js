
const { Router } = require("express");

const { uploadDocs, deleteFile, getDocsByDeptController, getAllDocsController } = require('../controller/DocsController.js');
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { requireSignIn, isAdmin } = require('../Middlewares/authMiddleware.js');

router.delete('/deleteDocs', requireSignIn, isAdmin, deleteFile);
router.post('/uploadDocs', requireSignIn, isAdmin, upload.single('pdf'), uploadDocs);
router.post('/getDocsByDept', requireSignIn, getDocsByDeptController);
router.get('/getAllDocs', requireSignIn, isAdmin, getAllDocsController);


module.exports = router;
