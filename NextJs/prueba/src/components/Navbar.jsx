import Link from 'next/link'
export default function Navbar() {
    return(
        <nav className='bg-slate-400 mb-4 flex justify-between items-center px-20
p-3 font-bold text-black'>
            <Link href="/">
                Home
            </Link>
            <ul className='flex gap-4'>
                <li>
                    <Link href="/about" >
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/posts" >
                        Posts
                    </Link>
                </li>
                <li>
                    <Link href="/examples" >
                        Examples
                    </Link>
                </li>
                <li>
                    <Link href="/contact/book" >
                        Book
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
