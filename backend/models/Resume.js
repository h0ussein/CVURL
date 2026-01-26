const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    fullName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    phone: String,
    email: {
      type: String,
      required: true
    },
    location: String,
    linkedin: String,
    github: String,
    website: String
  },
  careerObjective: {
    type: String,
    required: true
  },
  technicalSkills: [{
    category: String,
    skills: [String]
  }],
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    technologies: [String],
    link: String,
    github: String
  }],
  softwareExperience: [{
    title: String,
    description: String
  }],
  education: [{
    degree: String,
    field: String,
    institution: String,
    year: String,
    location: String
  }],
  languages: [{
    language: String,
    proficiency: String
  }],
  urlSlug: {
    type: String,
    unique: true,
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
