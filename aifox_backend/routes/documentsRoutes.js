
const { Router } = require("express");

const { uploadDocs, deleteFile, getDocsByDeptController, getAllDocsController } = require('../controller/DocsController.js');
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { requireSignIn, isAdmin } = require('../Middlewares/authMiddleware.js');

router.delete('/deleteDocs', isAdmin, deleteFile);
router.post('/uploadDocs', isAdmin, upload.single('pdf'), uploadDocs);
router.get('/getDocsByDept', requireSignIn, getDocsByDeptController);
router.get('/getAllDocs', isAdmin, getAllDocsController);


module.exports = router;
