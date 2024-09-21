const express = require('express');
const router = express.Router();
const { startChat, conversation } = require('../controller/conversationController');

router.post('/startChat', startChat);
router.post('/conversation', conversation);

module.exports = router;
