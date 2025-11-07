import PostCard from '@/components/PostCard'
import styles from './page.module.css'

// Estrategias de Rendering en Next.js (App Router)
// SSR: Datos en tiempo real (peor performance, se actualiza en cada request)
// SSG: Contenido estático (mejor performance, se actualiza en build time)
// ISR: contenido semi-dinámico (performance medio, se actualiza cada X segundos)

// 1. SSR - Server-Side Rendering (sin caché)
async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store' //Siempre actualizado, sin cache
    })
    return res.json()
}

async function PostsPage() {
    const posts = await loadPosts()
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Posts</h1>
                <p className={styles.subtitle}>Datos cargados con Server-Side Rendering</p>
                <span className={styles.badge}>SSR • Real-Time</span>
            </div>
            <div className='grid'>
                {
                    posts.map(post => (
                        <PostCard post={post} key={post.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default PostsPage
