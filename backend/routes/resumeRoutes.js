const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Public routes
router.get('/:slug', resumeController.getResumeBySlug);

// Admin routes (you can add authentication middleware later)
router.post('/', resumeController.createResume);
router.put('/:slug', resumeController.updateResume);
router.delete('/:slug', resumeController.deleteResume);
router.get('/', resumeController.getAllResumes);

module.exports = router;
