import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

function StepPayment({ proceedNext, initialData = {}, setCanNext, setStepData, setSubmitCurrentStep }) {
    // useForm inicializa el formulario con datos previos y validación en tiempo real
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({defaultValues: initialData, mode: 'onChange'});

    // Actualiza si se puede avanzar según la validez del formulario
    useEffect(() => {setCanNext(isValid)}, [isValid, setCanNext]);

    // Resetea el formulario con datos iniciales si cambian
    useEffect(() => {reset(initialData);}, [initialData, reset]);

    // Función que se ejecuta al enviar el formulario
    const onSubmit = useCallback((data) => {
        setStepData(data);
        proceedNext();
        console.log("StepPayment submitted:", data);
    }, [setStepData, proceedNext]);

    // Registra la función de envío para que Navigation la pueda llamar
    useEffect(() => {
        setSubmitCurrentStep(() => handleSubmit(onSubmit));
    }, [handleSubmit, onSubmit, setSubmitCurrentStep]);

    return (
        <form className="step-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="step-title">Paso 4: Pago</h2>

            {/* Selección del plan */}
            <div className="form-group">
                <label htmlFor="plan" className="form-label">Plan de Suscripción:</label>
                <select
                    id="plan"
                    className={`form-input ${errors.plan ? 'error' : ''}`}
                    {...register("plan", {
                        required: "Debes seleccionar un plan"
                    })}
                >
                    <option value="">Selecciona un plan</option>
                    <option value="monthly">Mensual - 29.99€/mes</option>
                    <option value="annual">Anual - 299.99€/año</option>
                </select>
                {errors.plan && <p className="error-message">{errors.plan.message}</p>}
            </div>

            {/* Número de tarjeta */}
            <div className="form-group">
                <label htmlFor="cardNumber" className="form-label">Número de Tarjeta:</label>
                <input
                    id="cardNumber"
                    className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                    {...register("cardNumber", {
                        required: "El número de tarjeta es obligatorio",
                        pattern: {
                            value: /^[0-9]{16}$/,
                            message: "El número de tarjeta debe tener 16 dígitos"
                        }
                    })}
                    placeholder="1234567890123456"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    maxLength={16}
                />
                {errors.cardNumber && <p className="error-message">{errors.cardNumber.message}</p>}
            </div>

            {/* Nombre en la tarjeta */}
            <div className="form-group">
                <label htmlFor="cardName" className="form-label">Nombre en la Tarjeta:</label>
                <input
                    id="cardName"
                    className={`form-input ${errors.cardName ? 'error' : ''}`}
                    {...register("cardName", {
                        required: "El nombre en la tarjeta es obligatorio",
                        minLength: {value: 3, message: "El nombre debe tener al menos 3 caracteres"}
                    })}
                    placeholder="NOMBRE APELLIDO"
                    autoComplete="cc-name"
                />
                {errors.cardName && <p className="error-message">{errors.cardName.message}</p>}
            </div>

            {/* Fecha de expiración */}
            <div className="form-group">
                <label htmlFor="expiryDate" className="form-label">Fecha de Expiración (MM/AA):</label>
                <input
                    id="expiryDate"
                    className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                    {...register("expiryDate", {
                        required: "La fecha de expiración es obligatoria",
                        pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: "Formato inválido. Usa MM/AA"
                        }
                    })}
                    placeholder="12/25"
                    autoComplete="cc-exp"
                    maxLength={5}
                />
                {errors.expiryDate && <p className="error-message">{errors.expiryDate.message}</p>}
            </div>

            {/* CVV */}
            <div className="form-group">
                <label htmlFor="cvv" className="form-label">CVV:</label>
                <input
                    id="cvv"
                    className={`form-input ${errors.cvv ? 'error' : ''}`}
                    {...register("cvv", {
                        required: "El CVV es obligatorio",
                        pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: "El CVV debe tener 3 o 4 dígitos"
                        }
                    })}
                    placeholder="123"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    maxLength={4}
                    type="password"
                />
                {errors.cvv && <p className="error-message">{errors.cvv.message}</p>}
            </div>
        </form>
    );
}

export default StepPayment;