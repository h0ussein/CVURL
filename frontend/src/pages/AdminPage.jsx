import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resumeData as defaultData, normalizeResumeData } from '../data/resumeData';
import { colorThemes, getTheme } from '../data/colorThemes';

const PASSCODE = '301103';

const SECTIONS = ['theme', 'personal', 'objective', 'skills', 'projects', 'software', 'education', 'languages'];

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [resumeData, setResumeData] = useState(() => normalizeResumeData(defaultData));
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [openSection, setOpenSection] = useState('theme');

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(normalizeResumeData(JSON.parse(savedData)));
      } catch (_) {}
    }
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme) setSelectedTheme(savedTheme);
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
    localStorage.setItem('resumeData', JSON.stringify(normalizeResumeData(resumeData)));
    localStorage.setItem('resumeTheme', selectedTheme);
    toast.success('Resume updated successfully!');
  };

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    localStorage.setItem('resumeTheme', themeId);
    toast.success(`Theme: ${getTheme(themeId).name}`);
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const updateSkillCategory = (index, field, value) => {
    const newSkills = [...resumeData.technicalSkills];
    if (field === 'skills') {
      // Keep empty lines so user can add new skills on new lines (don't filter(Boolean))
      newSkills[index].skills = value.split('\n').map((s) => s.trim());
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
    setResumeData({
      ...resumeData,
      technicalSkills: resumeData.technicalSkills.filter((_, i) => i !== index)
    });
  };

  const moveSkillCategory = (index, direction) => {
    const newSkills = [...resumeData.technicalSkills];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newSkills.length) return;
    [newSkills[index], newSkills[target]] = [newSkills[target], newSkills[index]];
    setResumeData({ ...resumeData, technicalSkills: newSkills });
    toast.success(`Category moved ${direction === 'up' ? 'up' : 'down'}`);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...resumeData.projects];
    if (field === 'title') newProjects[index].title = value;
    else if (field === 'bullets') newProjects[index].bullets = Array.isArray(value) ? value : value.split('\n').map((s) => s.trim()).filter(Boolean);
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjectBullet = (projectIndex) => {
    const newProjects = [...resumeData.projects];
    if (!newProjects[projectIndex].bullets) newProjects[projectIndex].bullets = [];
    newProjects[projectIndex].bullets.push('');
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const updateProjectBullet = (projectIndex, bulletIndex, value) => {
    const newProjects = [...resumeData.projects];
    if (!newProjects[projectIndex].bullets) newProjects[projectIndex].bullets = [];
    newProjects[projectIndex].bullets[bulletIndex] = value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const removeProjectBullet = (projectIndex, bulletIndex) => {
    const newProjects = [...resumeData.projects];
    newProjects[projectIndex].bullets = newProjects[projectIndex].bullets?.filter((_, i) => i !== bulletIndex) || [];
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: '', bullets: [''] }]
    });
  };

  const removeProject = (index) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index)
    });
  };

  const moveProject = (index, direction) => {
    const newProjects = [...resumeData.projects];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newProjects.length) return;
    [newProjects[index], newProjects[target]] = [newProjects[target], newProjects[index]];
    setResumeData({ ...resumeData, projects: newProjects });
    toast.success(`Project moved ${direction === 'up' ? 'up' : 'down'}`);
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
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((_, i) => i !== index)
    });
  };

  const softwareArray = Array.isArray(resumeData.softwareExperience) ? resumeData.softwareExperience : [];
  const setSoftwareExperience = (value) => {
    const arr = typeof value === 'string' ? value.split('\n').map((s) => s.trim()) : value;
    setResumeData({ ...resumeData, softwareExperience: arr });
  };

  const toggleSection = (id) => setOpenSection((s) => (s === id ? '' : id));

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
              <label className="block text-sm font-medium text-gray-700 mb-2">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                autoFocus
              />
            </div>
            <button type="submit" className={`w-full ${getTheme(selectedTheme).primary} text-white py-3 rounded-lg ${getTheme(selectedTheme).hover} transition font-medium`}>
              Unlock
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className={`${getTheme(selectedTheme).text} hover:opacity-80 text-sm transition`}>
              ← Back to Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sectionTitle = (id, label, emoji) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-3 px-4 text-left rounded-lg hover:bg-gray-50 transition"
    >
      <span className="font-bold text-gray-900">{emoji} {label}</span>
      <span className="text-gray-500">{openSection === id ? '▼' : '▶'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 md:px-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header - compact on mobile */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">Resume Editor</h1>
              <p className="text-gray-600 text-sm mt-1">Tap a section to open • One section per screen</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => navigate('/')} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                View Resume
              </button>
              <button onClick={handleSave} className={`px-4 py-2 ${getTheme(selectedTheme).primary} text-white rounded-lg ${getTheme(selectedTheme).hover} transition font-medium text-sm`}>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible sections - one open at a time */}
        <div className="space-y-2">
          {/* Theme */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('theme', 'Color Theme', '🎨')}
            {openSection === 'theme' && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`relative p-3 rounded-lg border-2 text-left ${selectedTheme === theme.id ? 'border-gray-900 shadow' : 'border-gray-200'}`}
                    >
                      <div className={`w-full h-14 rounded bg-gradient-to-r ${theme.gradient} mb-2`} />
                      <p className="text-xs font-medium text-gray-900">{theme.name}</p>
                      {selectedTheme === theme.id && <span className="absolute top-2 right-2 text-green-600">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('personal', 'Personal Information', '👤')}
            {openSection === 'personal' && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-3 pt-4">
                {['fullName', 'title', 'phone', 'email', 'location'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={resumeData.personalInfo[field] || ''}
                      onChange={(e) => updatePersonalInfo(field, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-base"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Objective */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('objective', 'Career Objective', '📝')}
            {openSection === 'objective' && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                <textarea
                  value={resumeData.careerObjective}
                  onChange={(e) => setResumeData({ ...resumeData, careerObjective: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-base"
                />
              </div>
            )}
          </div>

          {/* Technical Skills - one skill per line */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('skills', 'Technical Skills', '🛠️')}
            {openSection === 'skills' && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-4 pt-4">
                <p className="text-sm text-gray-600">Each category on its own; skills one per line. Use ↑↓ to reorder categories.</p>
                {resumeData.technicalSkills.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 font-medium">#{index + 1}</span>
                      <input
                        type="text"
                        value={skill.category}
                        onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                        placeholder="Category (e.g. Programming)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base"
                      />
                      <div className="flex flex-col gap-0.5">
                        <button type="button" onClick={() => moveSkillCategory(index, 'up')} disabled={index === 0} className="p-1.5 rounded bg-gray-100 disabled:opacity-40" aria-label="Move up">↑</button>
                        <button type="button" onClick={() => moveSkillCategory(index, 'down')} disabled={index === resumeData.technicalSkills.length - 1} className="p-1.5 rounded bg-gray-100 disabled:opacity-40" aria-label="Move down">↓</button>
                      </div>
                    </div>
                    <textarea
                      value={(skill.skills || []).join('\n')}
                      onChange={(e) => updateSkillCategory(index, 'skills', e.target.value)}
                      placeholder="One skill per line"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base"
                    />
                    <button type="button" onClick={() => removeSkillCategory(index)} className="mt-2 text-red-600 text-sm">
                      Remove category
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addSkillCategory} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 text-sm">
                  + Add category
                </button>
              </div>
            )}
          </div>

          {/* Projects - title + bullets, reorder */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('projects', 'Projects', '📁')}
            {openSection === 'projects' && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-4 pt-4">
                <p className="text-sm text-gray-600">Title then bullet points (one per line on resume). Use ↑↓ to reorder.</p>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 font-medium">#{index + 1}</span>
                      <input
                        type="text"
                        value={project.title || ''}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        placeholder="Project title"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base"
                      />
                      <div className="flex flex-col gap-0.5">
                        <button type="button" onClick={() => moveProject(index, 'up')} disabled={index === 0} className="p-1.5 rounded bg-gray-100 disabled:opacity-40" aria-label="Move up">↑</button>
                        <button type="button" onClick={() => moveProject(index, 'down')} disabled={index === resumeData.projects.length - 1} className="p-1.5 rounded bg-gray-100 disabled:opacity-40" aria-label="Move down">↓</button>
                      </div>
                    </div>
                    <div className="space-y-2 ml-2">
                      {(project.bullets || ['']).map((bullet, bi) => (
                        <div key={bi} className="flex gap-2 items-start">
                          <span className="text-gray-400 mt-2.5">–</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => updateProjectBullet(index, bi, e.target.value)}
                            placeholder="Bullet point"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base"
                          />
                          <button type="button" onClick={() => removeProjectBullet(index, bi)} className="text-red-500 p-1" aria-label="Remove">×</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addProjectBullet(index)} className="text-sm text-blue-600">+ Add bullet</button>
                    </div>
                    <button type="button" onClick={() => removeProject(index)} className="mt-2 text-red-600 text-sm">Remove project</button>
                  </div>
                ))}
                <button type="button" onClick={addProject} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 text-sm">
                  + Add project
                </button>
              </div>
            )}
          </div>

          {/* Software Experience - one per line */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('software', 'Software Experience', '💻')}
            {openSection === 'software' && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                <label className="block text-sm text-gray-600 mb-2">One item per line (each will show with a dash on resume)</label>
                <textarea
                  value={softwareArray.join('\n')}
                  onChange={(e) => setSoftwareExperience(e.target.value)}
                  placeholder="MERN Stack Apps&#10;React Native Mobile Apps&#10;Godot Game Development"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base"
                />
              </div>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('education', 'Education', '🎓')}
            {openSection === 'education' && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-3 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input type="text" value={resumeData.education.degree || ''} onChange={(e) => setResumeData({ ...resumeData, education: { ...resumeData.education, degree: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                  <input type="text" value={resumeData.education.field || ''} onChange={(e) => setResumeData({ ...resumeData, education: { ...resumeData.education, field: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input type="text" value={resumeData.education.institution || ''} onChange={(e) => setResumeData({ ...resumeData, education: { ...resumeData.education, institution: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" />
                </div>
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sectionTitle('languages', 'Languages', '🌐')}
            {openSection === 'languages' && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-3 pt-4">
                {resumeData.languages.map((lang, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input type="text" value={lang.language || ''} onChange={(e) => updateLanguage(index, 'language', e.target.value)} placeholder="Language" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base" />
                    <input type="text" value={lang.proficiency || ''} onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)} placeholder="e.g. Native" className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-base" />
                    <button type="button" onClick={() => removeLanguage(index)} className="text-red-500 p-1">×</button>
                  </div>
                ))}
                <button type="button" onClick={addLanguage} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 text-sm">+ Add language</button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button onClick={handleSave} className={`px-8 py-3 ${getTheme(selectedTheme).primary} text-white rounded-lg ${getTheme(selectedTheme).hover} transition font-medium`}>
            💾 Save all changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
