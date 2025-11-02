function Navigation({ step, totalSteps, onBack, onNext, canNext }) {
    const isFirst = step === 0
    const isLast = step === totalSteps - 1

    return (
        <nav className="navigation-container">
            <div className="progress-indicator">
                <p className="step-counter">Paso {step + 1} de {totalSteps}</p>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{width: `${((step + 1) / totalSteps) * 100}%`}}
                    ></div>
                </div>
            </div>

            <div className="navigation-buttons">
                <button
                    className="btn-back"
                    onClick={onBack}
                    disabled={isFirst}
                >
                    Atrás
                </button>

                <button
                    className={`btn-next ${!canNext ? 'disabled' : ''}`}
                    onClick={onNext}
                    disabled={isLast || !canNext}
                >
                    Siguiente
                </button>
            </div>
        </nav>
    )
}
export default Navigation;