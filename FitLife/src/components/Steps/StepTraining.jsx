import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

const TRAINING_OPTIONS = [
    {value: 'fuerza', label: 'Entrenamiento de Fuerza'},
    {value: 'cardio', label: 'Entrenamiento Cardiovascular'},
    {value: 'flexibilidad', label: 'Entrenamiento de Flexibilidad'},
    {value: 'mixto', label: 'Entrenamiento Mixto'},
];

const OBJECTIVE_OPTIONS = [
    { value: 'perder_peso', label: 'Perder Peso' },
    { value: 'ganar_musculo', label: 'Ganar Músculo' },
    { value: 'mejorar_resistencia', label: 'Mejorar Resistencia' },
    { value: 'aumentar_flexibilidad', label: 'Aumentar Flexibilidad' },
    { value: 'mantener_salud_general', label: 'Mantener Salud General' },
];

const AVAILABILITY_OPTIONS = [
    { value: '1-2_dias', label: '1-2 días por semana' },
    { value: '3-4_dias', label: '3-4 días por semana' },
    { value: '5-6_dias', label: '5-6 días por semana' },
    { value: 'todos_los_dias', label: 'Todos los días' },
];

const INTENSITY_OPTIONS = [
    { value: 'baja', label: 'Baja' },
    { value: 'moderada', label: 'Moderada' },
    { value: 'alta', label: 'Alta' },
];

function StepTraining({ proceedNext, initialData = {}, setCanNext, setStepData, setSubmitCurrentStep}) {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
    } = useForm({defaultValues: initialData, mode: 'onChange'});

    useEffect(() => { setCanNext(isValid)}, [isValid, setCanNext]);
    useEffect(() => {reset(initialData)}, [initialData, reset]);

    const onSubmit = useCallback((data) => {
        setStepData(data);
        proceedNext();
        console.log("StepTraining submitted:", data);
    });

    useEffect(() => {
        setSubmitCurrentStep(() => handleSubmit(onSubmit));
    }, [handleSubmit, onSubmit, setSubmitCurrentStep]);

    return (
        <form className="step-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="step-title">Paso 3: Preferencias de Entrenamiento</h2>
            <div className="form-group">
                <label htmlFor="trainingType" className="form-label">Tipo de Entrenamiento:</label>
                <select
                    id="trainingType"
                    className={`form-input ${errors.trainingType ? 'error' : ''}`}
                    {...register("trainingType", { required: "El tipo de entrenamiento es obligatorio" })}
                >
                    <option value="">Seleccione una opción</option>
                    {TRAINING_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {errors.trainingType && <p className="error-message">{errors.trainingType.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="goal" className="form-label">Objetivo Principal:</label>
                <select
                    id="goal"
                    className={`form-input ${errors.goal ? 'error' : ''}`}
                    {...register("goal", { required: "El objetivo es obligatorio" })}
                >
                    <option value="">Seleccione una opción</option>
                    {OBJECTIVE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {errors.goal && <p className="error-message">{errors.goal.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="availability" className="form-label">Disponibilidad Semanal:</label>
                <select
                    id="availability"
                    className={`form-input ${errors.availability ? 'error' : ''}`}
                    {...register("availability", { required: "La disponibilidad es obligatoria" })}
                >
                    <option value="">Seleccione una opción</option>
                    {AVAILABILITY_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {errors.availability && <p className="error-message">{errors.availability.message}</p>}
            </div>
        </form>
    );
}
export default StepTraining;