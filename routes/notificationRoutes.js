const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// GET /notifications/:userId?role=user|tasker
router.get('/:userId', notificationController.getNotificationsByUser);
router.post('/test-topic', notificationController.sendTopicNotificationController);

module.exports = router;