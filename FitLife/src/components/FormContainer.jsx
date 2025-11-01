// Componente contenedor principal del formulario
import { useState } from 'react'
import ProgressBar from './ProgressBar'
import PersonalDataForm from './PersonalDataForm'
import ContactInfoForm from './ContactInfoForm'
import TrainingPreferencesForm from './TrainingPreferencesForm'
import PaymentForm from './PaymentForm'
import SuccessMessage from './SuccessMessage'
import { mockSubmitRegistration } from '../utils/api'
import styles from '../styles/FormContainer.module.css'

function FormContainer() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState({
    personalData: {},
    contactInfo: {},
    trainingPreferences: {},
    payment: {}
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Función para avanzar al siguiente paso
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Función para volver al paso anterior
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Función para guardar datos de cada formulario
  const handleFormData = (step, data) => {
    setFormData({
      ...formData,
      [step]: data
    })
  }

  // Función para enviar todos los datos al servidor
  const handleFinalSubmit = async (paymentData) => {
    const finalData = {
      ...formData,
      payment: paymentData
    }

    setIsLoading(true)

    const result = await mockSubmitRegistration(finalData)

    setIsLoading(false)

    if (result.success) {
      setFormData(finalData)
      setIsSubmitted(true)
    } else {
      alert('Error al registrar. Intenta de nuevo.')
    }
  }

  // Si se completó el registro, mostrar mensaje de éxito
  if (isSubmitted) {
    return <SuccessMessage userData={formData} />
  }

  // Sino, mostrar el formulario actual
  return (
    <div className={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className={styles.formWrapper}>
        {currentStep === 1 && (
          <PersonalDataForm
            onNext={handleNextStep}
            onFormData={(data) => handleFormData('personalData', data)}
            initialData={formData.personalData}
          />
        )}

        {currentStep === 2 && (
          <ContactInfoForm
            onNext={handleNextStep}
            onBack={handleBackStep}
            onFormData={(data) => handleFormData('contactInfo', data)}
            initialData={formData.contactInfo}
          />
        )}

        {currentStep === 3 && (
          <TrainingPreferencesForm
            onNext={handleNextStep}
            onBack={handleBackStep}
            onFormData={(data) => handleFormData('trainingPreferences', data)}
            initialData={formData.trainingPreferences}
          />
        )}

        {currentStep === 4 && (
          <PaymentForm
            onBack={handleBackStep}
            onSubmit={handleFinalSubmit}
            initialData={formData.payment}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}

export default FormContainer
