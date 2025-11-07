import styles from './page.module.css'

// 3. ISR - Incremental Static Regeneration (caché con revalidación)
async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: { revalidate: 3600 } // Revalidar cada hora
    })
    return res.json()
}

async function ExamplesPage() {
    const posts = await loadPosts()
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Examples</h1>
                    <p className={styles.subtitle}>Incremental Static Regeneration</p>
                    <span className={styles.badge}>ISR • Optimized</span>
                </div>
            </div>
            <div className='grid'>
                {
                    posts.slice(0, 5).map(post => (
                        <div key={post.id}>
                            <h3>{post.id}. {post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ExamplesPage
