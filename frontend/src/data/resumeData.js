// Projects: { title, bullets[] } - each bullet shows on new line with dash
// Backward compat: old { title } is shown as one line
export const resumeData = {
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
      category: "Programming",
      skills: ["Python", "TensorFlow", "Keras", "Scikit-Learn", "LangChain", "Llama 3", "Django/DB", "HuggingFace"]
    },
    {
      category: "Backend & Frontend",
      skills: ["MongoDB", "MySQL", "JavaScript", "Node.js", "React", "React Native", "PHP", "Java", "C#", "Godot Engine"]
    }
  ],
  projects: [
    {
      title: "AI Resume Screener (LLM + RAG)",
      bullets: [
        "Built a fully local RAG system using Llama 3, LangChain, ChromaDB, and Streamlit for resume analysis."
      ]
    },
    {
      title: "Chest X-Ray Pneumonia Detection",
      bullets: [
        "CNN with VGG16 transfer learning achieving 92% accuracy and 97% recall."
      ]
    },
    {
      title: "Credit Card Fraud Detection",
      bullets: [
        "Isolation Forest and Autoencoders models on 284k transactions."
      ]
    },
    {
      title: "Titanic Survival Prediction",
      bullets: [
        "Random Forest with 81.56% accuracy and feature engineering."
      ]
    }
  ],
  // One item per line on resume (displayed with dash each line)
  softwareExperience: [
    "MERN Stack Apps",
    "React Native Mobile Apps",
    "Godot Game Development",
    "PHP Web Platforms"
  ],
  education: {
    degree: "Bachelor of Science",
    field: "Computer Science",
    institution: "Lebanese International University"
  },
  languages: [
    { language: "Arabic", proficiency: "Native" },
    { language: "English", proficiency: "Fluent" },
    { language: "French", proficiency: "Good" }
  ]
};

// Normalize old saved data: project { title } -> { title, bullets }; softwareExperience string -> array
export function normalizeResumeData(data) {
  const d = JSON.parse(JSON.stringify(data));
  if (d.projects) {
    d.projects = d.projects.map((p) => {
      if (Array.isArray(p.bullets)) return { title: p.title || '', bullets: p.bullets };
      return { title: p.title || '', bullets: [p.title || ''].filter(Boolean) };
    });
  }
  if (typeof d.softwareExperience === 'string') {
    d.softwareExperience = d.softwareExperience
      ? d.softwareExperience.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
  }
  if (!Array.isArray(d.softwareExperience)) d.softwareExperience = [];
  return d;
}
