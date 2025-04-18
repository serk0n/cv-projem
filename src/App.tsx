import { useState } from 'react'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'
import { FaGithub } from 'react-icons/fa'

function App() {
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      photoUrl: '',
    },
    education: [{ institution: '', degree: '', date: '', description: '' }],
    experience: [{ company: '', position: '', date: '', description: '' }],
    skills: [''],
    languages: [''],
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">CV Oluşturucu</h1>
          <p className="text-indigo-200">Profesyonel ve modern CV'ler oluşturun</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CVForm cvData={cvData} setCvData={setCvData} />
          </div>
          <div>
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">© {new Date().getFullYear()} - Tasarım ve Kodlama</p>
              <p className="text-gray-400">Bu CV oluşturucu uygulaması <span className="text-indigo-400 font-medium">Serkan Demir</span> tarafından geliştirilmiştir.</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/serk0n" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
