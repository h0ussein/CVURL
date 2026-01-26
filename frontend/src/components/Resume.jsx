import { useState, useEffect } from 'react';
import { resumeData as defaultData } from '../data/resumeData';
import { getTheme } from '../data/colorThemes';
import toast from 'react-hot-toast';

const Resume = () => {
  const [resumeData, setResumeData] = useState(defaultData);
  const [theme, setTheme] = useState(getTheme('blue'));

  useEffect(() => {
    // Load resume data from localStorage if it exists
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme) {
      setTheme(getTheme(savedTheme));
    }
  }, []);
  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: resumeData.personalInfo.fullName,
          text: `Check out ${resumeData.personalInfo.fullName}'s resume`,
          url: url
        });
      } catch (error) {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:py-0">
      {/* Action Buttons - Hidden on print */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
        <div className="flex justify-end gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button
            onClick={handlePrint}
            className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-lg ${theme.hover} transition`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Download PDF
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Header */}
        <div className={`bg-gradient-to-r ${theme.gradient} text-white px-12 py-10 print:py-6`}>
          <h1 className="text-4xl font-bold mb-2 print:text-3xl">
            {resumeData.personalInfo.fullName}
          </h1>
          <p className="text-xl mb-4 text-blue-100 print:text-lg">
            {resumeData.personalInfo.title}
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Phone: {resumeData.personalInfo.phone}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email: {resumeData.personalInfo.email}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Location: {resumeData.personalInfo.location}</span>
            </div>
          </div>
        </div>

        <div className="px-12 py-8 print:px-8">
          {/* Career Objective */}
          <section className="mb-8">
            <h2 className={`text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 ${theme.border}`}>
              CAREER OBJECTIVE
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.careerObjective}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className={`text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 ${theme.border}`}>
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2">
              {resumeData.technicalSkills.map((skillGroup, index) => (
                <div key={index} className="flex flex-wrap">
                  <span className="font-semibold text-gray-900 min-w-[140px]">
                    {skillGroup.category}:
                  </span>
                  <span className="text-gray-700 flex-1">
                    {skillGroup.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className={`text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 ${theme.border}`}>
              PROJECTS
            </h2>
            <ul className="space-y-3">
              {resumeData.projects.map((project, index) => (
                <li key={index} className="text-gray-700 leading-relaxed">
                  {project.title}
                </li>
              ))}
            </ul>
          </section>

          {/* Software Experience */}
          <section className="mb-8">
            <h2 className={`text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 ${theme.border}`}>
              SOFTWARE EXPERIENCE
            </h2>
            <p className="text-gray-700">
              {resumeData.softwareExperience}
            </p>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className={`text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 ${theme.border}`}>
              EDUCATION
            </h2>
            <div>
              <p className="font-semibold text-gray-900">
                {resumeData.education.degree} in {resumeData.education.field}
              </p>
              <p className="text-gray-700">
                {resumeData.education.institution}
              </p>
            </div>
          </section>

          {/* Languages */}
          <section className="mb-8">
            <h2 className={`text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 ${theme.border}`}>
              LANGUAGES
            </h2>
            <p className="text-gray-700">
              {resumeData.languages.map((lang, index) => (
                <span key={index}>
                  {lang.language} ({lang.proficiency})
                  {index < resumeData.languages.length - 1 && ', '}
                </span>
              ))}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
