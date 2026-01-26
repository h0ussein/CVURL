const Resume = require('../models/Resume');

// Get resume by URL slug
exports.getResumeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const resume = await Resume.findOne({ urlSlug: slug, isActive: true });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Increment view count
    resume.viewCount += 1;
    await resume.save();

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new resume
exports.createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'URL slug already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update resume
exports.updateResume = async (req, res) => {
  try {
    const { slug } = req.params;
    const resume = await Resume.findOneAndUpdate(
      { urlSlug: slug },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all resumes (admin)
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const { slug } = req.params;
    const resume = await Resume.findOneAndDelete({ urlSlug: slug });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
