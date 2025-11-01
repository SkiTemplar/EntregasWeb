// Componente Logo - Reutilizable
import logoImg from '../assets/logo_nobackground.png'
import styles from '../styles/Logo.module.css'

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logoImg} alt="FitLife Logo" className={styles.logoImg} />
    </div>
  )
}

export default Logo
