import { ChangeEvent } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface CVFormProps {
  cvData: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
      photoUrl: string;
    };
    education: Array<{
      institution: string;
      degree: string;
      date: string;
      description: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      date: string;
      description: string;
    }>;
    skills: string[];
    languages: string[];
  };
  setCvData: React.Dispatch<React.SetStateAction<any>>;
}

const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData }) => {
  // Handle personal info changes
  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [name]: value,
      },
    });
  };

  // Handle photo upload
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData({
          ...cvData,
          personalInfo: {
            ...cvData.personalInfo,
            photoUrl: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle education change
  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...cvData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setCvData({
      ...cvData,
      education: newEducation,
    });
  };

  // Add new education entry
  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        { institution: '', degree: '', date: '', description: '' },
      ],
    });
  };

  // Remove education entry
  const removeEducation = (index: number) => {
    const newEducation = [...cvData.education];
    newEducation.splice(index, 1);
    setCvData({
      ...cvData,
      education: newEducation.length ? newEducation : [{ institution: '', degree: '', date: '', description: '' }],
    });
  };

  // Handle experience change
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...cvData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setCvData({
      ...cvData,
      experience: newExperience,
    });
  };

  // Add new experience entry
  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        { company: '', position: '', date: '', description: '' },
      ],
    });
  };

  // Remove experience entry
  const removeExperience = (index: number) => {
    const newExperience = [...cvData.experience];
    newExperience.splice(index, 1);
    setCvData({
      ...cvData,
      experience: newExperience.length ? newExperience : [{ company: '', position: '', date: '', description: '' }],
    });
  };

  // Handle skills change
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...cvData.skills];
    newSkills[index] = value;
    setCvData({
      ...cvData,
      skills: newSkills,
    });
  };

  // Add new skill
  const addSkill = () => {
    setCvData({
      ...cvData,
      skills: [...cvData.skills, ''],
    });
  };

  // Remove skill
  const removeSkill = (index: number) => {
    const newSkills = [...cvData.skills];
    newSkills.splice(index, 1);
    setCvData({
      ...cvData,
      skills: newSkills.length ? newSkills : [''],
    });
  };

  // Handle languages change
  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...cvData.languages];
    newLanguages[index] = value;
    setCvData({
      ...cvData,
      languages: newLanguages,
    });
  };

  // Add new language
  const addLanguage = () => {
    setCvData({
      ...cvData,
      languages: [...cvData.languages, ''],
    });
  };

  // Remove language
  const removeLanguage = (index: number) => {
    const newLanguages = [...cvData.languages];
    newLanguages.splice(index, 1);
    setCvData({
      ...cvData,
      languages: newLanguages.length ? newLanguages : [''],
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">CV Oluşturucu</h1>
      
      {/* Personal Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Kişisel Bilgiler</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={cvData.personalInfo.name}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={cvData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              name="phone"
              value={cvData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
            <input
              type="text"
              name="address"
              value={cvData.personalInfo.address}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fotoğraf</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Education */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Eğitim</h2>
          <button 
            onClick={addEducation}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center text-sm"
          >
            <FaPlus className="mr-1" /> Ekle
          </button>
        </div>
        
        {cvData.education.map((edu, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">Eğitim #{index + 1}</h3>
              {cvData.education.length > 1 && (
                <button 
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kurum</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Derece/Bölüm</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                <input
                  type="text"
                  value={edu.date}
                  onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: 2018 - 2022"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Experience */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">İş Deneyimi</h2>
          <button 
            onClick={addExperience}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center text-sm"
          >
            <FaPlus className="mr-1" /> Ekle
          </button>
        </div>
        
        {cvData.experience.map((exp, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">Deneyim #{index + 1}</h3>
              {cvData.experience.length > 1 && (
                <button 
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şirket</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pozisyon</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                <input
                  type="text"
                  value={exp.date}
                  onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Ocak 2020 - Günümüz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Skills */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Yetenekler</h2>
          <button 
            onClick={addSkill}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center text-sm"
          >
            <FaPlus className="mr-1" /> Ekle
          </button>
        </div>
        
        {cvData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Örn: JavaScript, Proje Yönetimi, vb."
            />
            {cvData.skills.length > 1 && (
              <button 
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Languages */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Diller</h2>
          <button 
            onClick={addLanguage}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center text-sm"
          >
            <FaPlus className="mr-1" /> Ekle
          </button>
        </div>
        
        {cvData.languages.map((language, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={language}
              onChange={(e) => handleLanguageChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Örn: İngilizce (Anadil), İspanyolca (Akıcı), vb."
            />
            {cvData.languages.length > 1 && (
              <button 
                onClick={() => removeLanguage(index)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVForm; 