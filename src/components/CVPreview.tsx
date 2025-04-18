import { useRef } from 'react';
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaUniversity, FaBuilding, FaLanguage, FaTools } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVPreviewProps {
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
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (pdfRef.current) {
      try {
        const canvas = await html2canvas(pdfRef.current, { 
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        
        pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${cvData.personalInfo.name || 'CV'}.pdf`);
      } catch (error) {
        console.error('PDF oluşturulurken hata oluştu:', error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ön İzleme</h1>
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center shadow-sm"
        >
          <FaDownload className="mr-2" /> PDF İndir
        </button>
      </div>

      <div 
        ref={pdfRef} 
        className="bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden max-w-[210mm] mx-auto"
        style={{ minHeight: '297mm' }}
      >
        {/* Header with background color */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-3">{cvData.personalInfo.name || 'İsminiz'}</h1>
              <div className="space-y-1">
                {cvData.personalInfo.email && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" />
                    <p>{cvData.personalInfo.email}</p>
                  </div>
                )}
                {cvData.personalInfo.phone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-2" />
                    <p>{cvData.personalInfo.phone}</p>
                  </div>
                )}
                {cvData.personalInfo.address && (
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <p>{cvData.personalInfo.address}</p>
                  </div>
                )}
              </div>
            </div>
            {cvData.personalInfo.photoUrl && (
              <div className="mt-4 md:mt-0">
                <img 
                  src={cvData.personalInfo.photoUrl} 
                  alt="Profil" 
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md" 
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* Education */}
          {cvData.education.some(edu => edu.institution || edu.degree) && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-indigo-600 text-2xl mr-2" />
                <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-indigo-600 flex-grow">Eğitim</h2>
              </div>
              <div className="space-y-6">
                {cvData.education.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-l-4 border-indigo-500 hover:shadow-md transition-all duration-300">
                    {(edu.institution || edu.degree) && (
                      <div className="mb-2">
                        <div className="flex items-start mb-2">
                          <FaUniversity className="text-indigo-700 mt-1 mr-2" />
                          <h3 className="text-xl font-semibold text-indigo-800">{edu.institution}{edu.degree ? ` - ${edu.degree}` : ''}</h3>
                        </div>
                        {edu.date && (
                          <div className="flex items-center text-indigo-700 ml-6">
                            <FaCalendarAlt className="mr-2" />
                            <span className="text-sm font-medium">{edu.date}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {edu.description && (
                      <div className="ml-6 mt-2 text-gray-700">{edu.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {cvData.experience.some(exp => exp.company || exp.position) && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaBriefcase className="text-purple-600 text-2xl mr-2" />
                <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-purple-600 flex-grow">İş Deneyimi</h2>
              </div>
              <div className="space-y-6">
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border-l-4 border-purple-500 hover:shadow-md transition-all duration-300">
                    {(exp.company || exp.position) && (
                      <div className="mb-2">
                        <div className="flex items-start mb-2">
                          <FaBuilding className="text-purple-700 mt-1 mr-2" />
                          <h3 className="text-xl font-semibold text-purple-800">{exp.position}{exp.company ? ` | ${exp.company}` : ''}</h3>
                        </div>
                        {exp.date && (
                          <div className="flex items-center text-purple-700 ml-6">
                            <FaCalendarAlt className="mr-2" />
                            <span className="text-sm font-medium">{exp.date}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {exp.description && (
                      <div className="ml-6 mt-2 text-gray-700">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills and Languages in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skills */}
            {cvData.skills.some(skill => skill) && (
              <div className="bg-indigo-50 rounded-lg p-4 border-t-4 border-indigo-500">
                <div className="flex items-center mb-4">
                  <FaTools className="text-indigo-600 text-xl mr-2" />
                  <h2 className="text-xl font-bold text-gray-800 pb-1 border-b-2 border-indigo-300">Yetenekler</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.filter(skill => skill).map((skill, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium shadow-sm">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvData.languages.some(language => language) && (
              <div className="bg-purple-50 rounded-lg p-4 border-t-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <FaLanguage className="text-purple-600 text-xl mr-2" />
                  <h2 className="text-xl font-bold text-gray-800 pb-1 border-b-2 border-purple-300">Diller</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cvData.languages.filter(language => language).map((language, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium shadow-sm">{language}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview; 