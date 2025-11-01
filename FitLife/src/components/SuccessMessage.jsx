// Componente SuccessMessage - Mensaje de éxito final
import { FaCheckCircle } from 'react-icons/fa'
import styles from '../styles/SuccessMessage.module.css'

function SuccessMessage({ userData }) {
  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <FaCheckCircle className={styles.icon} />

        <h2 className={styles.title}>¡Registro Completado! 🎉</h2>
        <p className={styles.subtitle}>Bienvenido a FitLife</p>

        <div className={styles.summary}>
          <h3>Resumen de tu Registro:</h3>

          <div className={styles.section}>
            <h4>📋 Datos Personales</h4>
            <p><strong>Nombre:</strong> {userData.personalData?.nombre}</p>
            <p><strong>Email:</strong> {userData.personalData?.email}</p>
            <p><strong>Teléfono:</strong> {userData.personalData?.telefono}</p>
          </div>

          <div className={styles.section}>
            <h4>📍 Contacto</h4>
            <p><strong>Dirección:</strong> {userData.contactInfo?.direccion}</p>
            <p><strong>Ciudad:</strong> {userData.contactInfo?.ciudad}</p>
            <p><strong>C.P.:</strong> {userData.contactInfo?.codigoPostal}</p>
          </div>

          <div className={styles.section}>
            <h4>💪 Entrenamiento</h4>
            <p><strong>Tipo:</strong> {userData.trainingPreferences?.tipoEntrenamiento}</p>
            <p><strong>Objetivo:</strong> {userData.trainingPreferences?.objetivo}</p>
            <p><strong>Horario:</strong> {userData.trainingPreferences?.disponibilidad}</p>
          </div>

          <div className={styles.section}>
            <h4>💳 Pago</h4>
            <p><strong>Método:</strong> {userData.payment?.metodoPago}</p>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Recibirás un email de confirmación pronto</p>
          <button
            className={styles.btnHome}
            onClick={() => window.location.reload()}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage
