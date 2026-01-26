import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resumeData as defaultData } from '../data/resumeData';
import { colorThemes, getTheme } from '../data/colorThemes';

const PASSCODE = '301103';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [resumeData, setResumeData] = useState(defaultData);
  const [selectedTheme, setSelectedTheme] = useState('blue');

  useEffect(() => {
    // Load resume data from localStorage if it exists
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === PASSCODE) {
      setIsAuthenticated(true);
      toast.success('Access granted!');
    } else {
      toast.error('Invalid passcode!');
      setPasscode('');
    }
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('resumeTheme', selectedTheme);
    toast.success('Resume updated successfully!');
  };

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    localStorage.setItem('resumeTheme', themeId);
    toast.success(`Theme changed to ${getTheme(themeId).name}!`);
  };

  const handleViewResume = () => {
    navigate('/');
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  const updateSkillCategory = (index, field, value) => {
    const newSkills = [...resumeData.technicalSkills];
    if (field === 'skills') {
      newSkills[index].skills = value.split(',').map(s => s.trim());
    } else {
      newSkills[index][field] = value;
    }
    setResumeData({ ...resumeData, technicalSkills: newSkills });
  };

  const addSkillCategory = () => {
    setResumeData({
      ...resumeData,
      technicalSkills: [...resumeData.technicalSkills, { category: '', skills: [] }]
    });
  };

  const removeSkillCategory = (index) => {
    const newSkills = resumeData.technicalSkills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, technicalSkills: newSkills });
  };

  const updateProject = (index, value) => {
    const newProjects = [...resumeData.projects];
    newProjects[index].title = value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: '' }]
    });
  };

  const removeProject = (index) => {
    const newProjects = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const updateLanguage = (index, field, value) => {
    const newLanguages = [...resumeData.languages];
    newLanguages[index][field] = value;
    setResumeData({ ...resumeData, languages: newLanguages });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, { language: '', proficiency: '' }]
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = resumeData.languages.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, languages: newLanguages });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${getTheme(selectedTheme).primary} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter passcode to edit resume</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className={`w-full ${getTheme(selectedTheme).primary} text-white py-3 rounded-lg ${getTheme(selectedTheme).hover} transition font-medium`}
            >
              Unlock
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className={`${getTheme(selectedTheme).text} hover:opacity-80 text-sm transition`}
            >
              ← Back to Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Editor</h1>
              <p className="text-gray-600 mt-1">Update your resume information</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleViewResume}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                View Resume
              </button>
              <button
                onClick={handleSave}
                className={`px-6 py-2 ${getTheme(selectedTheme).primary} text-white rounded-lg ${getTheme(selectedTheme).hover} transition font-medium`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Color Theme Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎨 Color Theme</h2>
          <p className="text-gray-600 mb-4">Choose a color theme for your resume</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedTheme === theme.id
                    ? 'border-gray-900 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className={`w-full h-20 rounded-md bg-gradient-to-r ${theme.gradient} mb-3`}></div>
                <p className="text-sm font-medium text-gray-900 text-center">{theme.name}</p>
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Your color theme will be applied to your resume header, section borders, and buttons. Changes are saved automatically when you click "Save Changes" below.
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={resumeData.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Career Objective */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Career Objective</h2>
          <textarea
            value={resumeData.careerObjective}
            onChange={(e) => setResumeData({ ...resumeData, careerObjective: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Technical Skills */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Technical Skills</h2>
            <button
              onClick={addSkillCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              + Add Category
            </button>
          </div>
          <div className="space-y-4">
            {resumeData.technicalSkills.map((skill, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                      placeholder="e.g., Python, JavaScript"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                    <input
                      type="text"
                      value={skill.skills.join(', ')}
                      onChange={(e) => updateSkillCategory(index, 'skills', e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeSkillCategory(index)}
                  className="mt-2 text-red-600 hover:text-red-700 text-sm"
                >
                  Remove Category
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Projects</h2>
            <button
              onClick={addProject}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              + Add Project
            </button>
          </div>
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Project {index + 1}</label>
                <textarea
                  value={project.title}
                  onChange={(e) => updateProject(index, e.target.value)}
                  rows="2"
                  placeholder="Project title and description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={() => removeProject(index)}
                  className="mt-2 text-red-600 hover:text-red-700 text-sm"
                >
                  Remove Project
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Software Experience */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Software Experience</h2>
          <textarea
            value={resumeData.softwareExperience}
            onChange={(e) => setResumeData({ ...resumeData, softwareExperience: e.target.value })}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <input
                type="text"
                value={resumeData.education.degree}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  education: { ...resumeData.education, degree: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Field</label>
              <input
                type="text"
                value={resumeData.education.field}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  education: { ...resumeData.education, field: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
              <input
                type="text"
                value={resumeData.education.institution}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  education: { ...resumeData.education, institution: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Languages</h2>
            <button
              onClick={addLanguage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              + Add Language
            </button>
          </div>
          <div className="space-y-4">
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency</label>
                    <input
                      type="text"
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeLanguage(index)}
                  className="mt-2 text-red-600 hover:text-red-700 text-sm"
                >
                  Remove Language
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className={`px-8 py-3 ${getTheme(selectedTheme).primary} text-white rounded-lg ${getTheme(selectedTheme).hover} transition font-medium text-lg`}
          >
            💾 Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
