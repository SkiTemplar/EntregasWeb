// Componente PersonalDataForm - Primer formulario
import { useForm } from 'react-hook-form'
import { validateEmail, validatePhone } from '../utils/validations'
import styles from '../styles/Form.module.css'

function PersonalDataForm({ onNext, onFormData, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  })

  const onSubmit = (data) => {
    onFormData(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.formTitle}>Datos Personales</h2>
      <p className={styles.formSubtitle}>Cuéntanos sobre ti</p>

      <div className={styles.formGroup}>
        <label htmlFor="nombre" className={styles.label}>
          Nombre Completo *
        </label>
        <input
          id="nombre"
          type="text"
          className={styles.input}
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres"
            }
          })}
        />
        {errors.nombre && (
          <span className={styles.error}>{errors.nombre.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email *
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register("email", {
            required: "El email es obligatorio",
            validate: (value) => validateEmail(value) || "Email inválido"
          })}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="telefono" className={styles.label}>
          Teléfono *
        </label>
        <input
          id="telefono"
          type="tel"
          className={styles.input}
          placeholder="123456789"
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            validate: (value) => validatePhone(value) || "Teléfono inválido (mínimo 9 dígitos)"
          })}
        />
        {errors.telefono && (
          <span className={styles.error}>{errors.telefono.message}</span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.btnPrimary}>
          Siguiente →
        </button>
      </div>
    </form>
  )
}

export default PersonalDataForm
