import { useState } from 'react'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        <CVForm cvData={cvData} setCvData={setCvData} />
      </div>
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        <CVPreview cvData={cvData} />
      </div>
    </div>
  )
}

export default App
