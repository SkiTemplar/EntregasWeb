import logoUtad from '../assets/Logo-U-tad.jpg'

function Logo() {
    return (
        <div className="logo-container">
            <img
                src={logoUtad}
                alt="Logo U-tad"
                className="logo"
            />
        </div>
    )
}

export default Logo
