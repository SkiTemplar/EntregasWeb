function Navigation({ step, totalSteps, onBack, onNext, canNext }) {
    const isFirst = step === 0
    const isLast = step === totalSteps - 1

    return (
        <div>
            <p>Paso {step + 1} de {totalSteps}</p>

            <button onClick={onBack} disabled={isFirst}>
                Atrás
            </button>

            <button onClick={onNext} disabled={isLast || !canNext}>
                Siguiente
            </button>
        </div>
    )
}
export default Navigation;