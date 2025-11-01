// Componente PaymentForm - Cuarto formulario (ÚLTIMO PASO)
import { useForm } from 'react-hook-form'
import { paymentMethods } from '../utils/constants'
import { validateCardNumber } from '../utils/validations'
import styles from '../styles/Form.module.css'

function PaymentForm({ onBack, onSubmit, initialData, isLoading }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: initialData
  })

  const selectedPaymentMethod = watch('metodoPago')
  const requiresCard = selectedPaymentMethod === 'Tarjeta de crédito' || selectedPaymentMethod === 'Tarjeta de débito'

  const onSubmitForm = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
      <h2 className={styles.formTitle}>Datos de Pago</h2>
      <p className={styles.formSubtitle}>Último paso para completar tu registro</p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Método de Pago *</label>
        <div className={styles.radioGroup}>
          {paymentMethods.map(method => (
            <label key={method.id} className={styles.radioLabel}>
              <input
                type="radio"
                value={method.name}
                {...register("metodoPago", {
                  required: "Selecciona un método de pago"
                })}
              />
              {method.name}
            </label>
          ))}
        </div>
        {errors.metodoPago && (
          <span className={styles.error}>{errors.metodoPago.message}</span>
        )}
      </div>

      {requiresCard && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="numeroTarjeta" className={styles.label}>
              Número de Tarjeta *
            </label>
            <input
              id="numeroTarjeta"
              type="text"
              className={styles.input}
              placeholder="1234567890123456"
              maxLength="16"
              {...register("numeroTarjeta", {
                required: requiresCard ? "El número de tarjeta es obligatorio" : false,
                validate: (value) => !requiresCard || validateCardNumber(value) || "Número de tarjeta inválido (16 dígitos)"
              })}
            />
            {errors.numeroTarjeta && (
              <span className={styles.error}>{errors.numeroTarjeta.message}</span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fechaExpiracion" className={styles.label}>
                Fecha Expiración *
              </label>
              <input
                id="fechaExpiracion"
                type="text"
                className={styles.input}
                placeholder="MM/AA"
                maxLength="5"
                {...register("fechaExpiracion", {
                  required: requiresCard ? "La fecha es obligatoria" : false,
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Formato inválido (MM/AA)"
                  }
                })}
              />
              {errors.fechaExpiracion && (
                <span className={styles.error}>{errors.fechaExpiracion.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvv" className={styles.label}>
                CVV *
              </label>
              <input
                id="cvv"
                type="text"
                className={styles.input}
                placeholder="123"
                maxLength="3"
                {...register("cvv", {
                  required: requiresCard ? "El CVV es obligatorio" : false,
                  pattern: {
                    value: /^\d{3}$/,
                    message: "CVV inválido (3 dígitos)"
                  }
                })}
              />
              {errors.cvv && (
                <span className={styles.error}>{errors.cvv.message}</span>
              )}
            </div>
          </div>
        </>
      )}

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.btnSecondary} disabled={isLoading}>
          ← Atrás
        </button>
        <button type="submit" className={styles.btnPrimary} disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Completar Registro ✓'}
        </button>
      </div>
    </form>
  )
}

export default PaymentForm
