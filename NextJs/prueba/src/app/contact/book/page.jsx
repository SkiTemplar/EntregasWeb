import styles from './page.module.css'

export default function Book() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title} data-text="Reserva">Reserva</h1>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Mesa VIP</li>
                    <li className={styles.listItem}>Salón Privado</li>
                    <li className={styles.listItem}>Terraza Premium</li>
                </ul>
            </div>
        </div>
    )
}
