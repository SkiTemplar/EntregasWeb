// Componente ProgressBar
import styles from '../styles/ProgressBar.module.css'

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressSteps}>
        <span>Paso {currentStep} de {totalSteps}</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
