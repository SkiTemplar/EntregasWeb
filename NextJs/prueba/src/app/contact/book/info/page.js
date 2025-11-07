import styles from './page.module.css'

export default function Info() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.title}>Info</h1>
                <p className={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    )
}
