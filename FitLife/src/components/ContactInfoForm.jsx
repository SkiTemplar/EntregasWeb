// Componente ContactInfoForm - Segundo formulario
import { useForm } from 'react-hook-form'
import { validatePostalCode } from '../utils/validations'
import styles from '../styles/Form.module.css'

function ContactInfoForm({ onNext, onBack, onFormData, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  })

  const onSubmit = (data) => {
    onFormData(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.formTitle}>Información de Contacto</h2>
      <p className={styles.formSubtitle}>¿Dónde te localizamos?</p>

      <div className={styles.formGroup}>
        <label htmlFor="direccion" className={styles.label}>
          Dirección *
        </label>
        <input
          id="direccion"
          type="text"
          className={styles.input}
          placeholder="Calle Principal 123"
          {...register("direccion", {
            required: "La dirección es obligatoria",
            minLength: {
              value: 5,
              message: "La dirección debe tener al menos 5 caracteres"
            }
          })}
        />
        {errors.direccion && (
          <span className={styles.error}>{errors.direccion.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ciudad" className={styles.label}>
          Ciudad *
        </label>
        <input
          id="ciudad"
          type="text"
          className={styles.input}
          placeholder="Madrid"
          {...register("ciudad", {
            required: "La ciudad es obligatoria"
          })}
        />
        {errors.ciudad && (
          <span className={styles.error}>{errors.ciudad.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="codigoPostal" className={styles.label}>
          Código Postal *
        </label>
        <input
          id="codigoPostal"
          type="text"
          className={styles.input}
          placeholder="28001"
          {...register("codigoPostal", {
            required: "El código postal es obligatorio",
            validate: (value) => validatePostalCode(value) || "Código postal inválido (5 dígitos)"
          })}
        />
        {errors.codigoPostal && (
          <span className={styles.error}>{errors.codigoPostal.message}</span>
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

export default ContactInfoForm
