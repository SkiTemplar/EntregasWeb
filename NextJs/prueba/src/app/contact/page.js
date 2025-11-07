import styles from './page.module.css'

export default function Contact() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Contact</h1>
                <ul className={styles.list}>
                    <li className={styles.listItem}>E-mail</li>
                    <li className={styles.listItem}>Phone number</li>
                    <li className={styles.listItem}>Social Media</li>
                </ul>
            </div>
        </div>
    )
}
