// Componente TrainingPreferencesForm - Tercer formulario
import { useForm } from 'react-hook-form'
import { trainingTypes, fitnessGoals, timeSlots } from '../utils/constants'
import styles from '../styles/Form.module.css'

function TrainingPreferencesForm({ onNext, onBack, onFormData, initialData }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: initialData
  })

  const selectedTraining = watch('tipoEntrenamiento')

  const onSubmit = (data) => {
    onFormData(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.formTitle}>Preferencias de Entrenamiento</h2>
      <p className={styles.formSubtitle}>Personaliza tu experiencia</p>

      <div className={styles.formGroup}>
        <label htmlFor="tipoEntrenamiento" className={styles.label}>
          Tipo de Entrenamiento *
        </label>
        <select
          id="tipoEntrenamiento"
          className={styles.input}
          {...register("tipoEntrenamiento", {
            required: "Selecciona un tipo de entrenamiento"
          })}
        >
          <option value="">Selecciona una opción</option>
          {trainingTypes.map(type => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.tipoEntrenamiento && (
          <span className={styles.error}>{errors.tipoEntrenamiento.message}</span>
        )}

        {selectedTraining && (
          <p className={styles.infoText}>
            {trainingTypes.find(t => t.name === selectedTraining)?.description}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Objetivo Fitness *</label>
        <div className={styles.radioGroup}>
          {fitnessGoals.map(goal => (
            <label key={goal.id} className={styles.radioLabel}>
              <input
                type="radio"
                value={goal.name}
                {...register("objetivo", {
                  required: "Selecciona un objetivo"
                })}
              />
              {goal.name}
            </label>
          ))}
        </div>
        {errors.objetivo && (
          <span className={styles.error}>{errors.objetivo.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Disponibilidad Horaria *</label>
        <div className={styles.radioGroup}>
          {timeSlots.map(slot => (
            <label key={slot.id} className={styles.radioLabel}>
              <input
                type="radio"
                value={slot.name}
                {...register("disponibilidad", {
                  required: "Selecciona tu disponibilidad"
                })}
              />
              {slot.name}
            </label>
          ))}
        </div>
        {errors.disponibilidad && (
          <span className={styles.error}>{errors.disponibilidad.message}</span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.btnSecondary}>
          ← Atrás
        </button>
        <button type="submit" className={styles.btnPrimary}>
          Siguiente →
        </button>
      </div>
    </form>
  )
}

export default TrainingPreferencesForm
