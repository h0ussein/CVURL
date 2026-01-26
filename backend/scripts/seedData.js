require('dotenv').config();
const mongoose = require('mongoose');
const Resume = require('../models/Resume');

const seedResume = {
  personalInfo: {
    fullName: "HUSSEIN IBRAHIM",
    title: "AI Engineer | Computer Science graduate",
    phone: "+961 78876348",
    email: "houssein.ibrahim.3@gmail.com",
    location: "Lebanon"
  },
  careerObjective: "Computer Science graduate at Lebanese International University transitioning into AI Engineering with strong foundations in LLMs, RAG pipelines, Deep Learning, and Unsupervised Learning. Passionate about developing intelligent systems for real-world use in backend applications.",
  technicalSkills: [
    {
      category: "Python",
      skills: ["TensorFlow", "Keras", "Scikit-Learn", "LangChain", "Llama 3", "Django/DB"]
    },
    {
      category: "JavaScript",
      skills: ["HuggingFace", "MongoDB", "MySQL", "JavaScript", "Node.js", "React", "React Native", "PHP", "Java", "C#", "Godot Engine"]
    }
  ],
  projects: [
    {
      title: "AI Resume Screener",
      description: "Build a fully local RAG system using Llama 3, LangChain, ChromaDB, and Streamlit for resume analysis.",
      technologies: ["Llama 3", "LangChain", "ChromaDB"]
    },
    {
      title: "Chest X-Ray Pneumonia Detection",
      description: "CNN with VGG16 transfer learning achieving 92% accuracy and 97% recall.",
      technologies: ["CNN", "VGG16", "TensorFlow"]
    },
    {
      title: "Credit Card Fraud Detection",
      description: "Isolation Forest and Autoencoders models on 284k transactions.",
      technologies: ["Isolation Forest", "Autoencoders"]
    },
    {
      title: "Titanic Survival Prediction",
      description: "Random Forest with 81.56% accuracy and feature engineering.",
      technologies: ["Random Forest", "Scikit-Learn"]
    }
  ],
  softwareExperience: [
    {
      title: "MERN Stack Apps",
      description: "React Native Mobile Apps, Godot Game Development, PHP Web Platforms."
    }
  ],
  education: [
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      institution: "Lebanese International University",
      location: "Lebanon"
    }
  ],
  languages: [
    { language: "Arabic", proficiency: "Native" },
    { language: "English", proficiency: "Fluent" },
    { language: "French", proficiency: "Good" }
  ],
  urlSlug: "hussein-ibrahim",
  isActive: true
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeurl');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Resume.deleteMany({});
    console.log('Cleared existing resumes');

    // Insert seed data
    const resume = await Resume.create(seedResume);
    console.log('Seed data inserted successfully');
    console.log(`Resume URL: http://localhost:5173/resume/${resume.urlSlug}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
