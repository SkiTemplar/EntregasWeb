import Link from "next/link"
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Página no encontrada</p>
            <Link href="/" className={styles.button}>
                Volver
            </Link>
        </section>
    )
}
