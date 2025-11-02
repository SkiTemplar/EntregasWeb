import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

function StepAddress({ proceedNext, initialData = {}, setCanNext, setStepData, setSubmitCurrentStep }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({defaultValues: initialData, mode: 'onChange'});

    useEffect(() => {setCanNext(isValid)}, [isValid, setCanNext]);
    useEffect(() => {reset(initialData);}, [initialData, reset]);

    const onSubmit = useCallback((data) => {
        setStepData(data);
        proceedNext();
        console.log("StepAddress submitted:", data);
    }, [setStepData, proceedNext]);

    useEffect(() => {
        setSubmitCurrentStep(() => handleSubmit(onSubmit));
    }, [handleSubmit, onSubmit, setSubmitCurrentStep]);

    return (
        <form className="step-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="step-title">Paso 2: Detalles de Domicilio</h2>
            <div className="form-group">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input
                    id="address"
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    {...register("address", {
                        required: "La dirección es obligatoria",
                        minLength: {value: 5, message: "La dirección debe tener al menos 5 caracteres"}
                    })}
                    placeholder="Calle Principal 123"
                    autoComplete="address"
                />
                {errors.address && <p className="error-message">{errors.address.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="city" className="form-label">Ciudad</label>
                <input
                    id="city"
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    {...register("city", {
                        required: "La ciudad es obligatoria",
                        minLength: {value: 3, message: "La ciudad debe tener al menos 3 caracteres"}

                    })}
                    placeholder="Madrid"
                    autoComplete="city"
                />
                {errors.city && <p className="error-message">{errors.city.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="postalcode" className="form-label">Código Postal</label>
                <input
                    id="postalcode"
                    className={`form-input ${errors.postalCode ? 'error' : ''}`}
                    {...register("postalCode", {
                        required: "El código postal es obligatorio",
                        pattern: {
                            value: /^[0-9]{5}$/,
                            message: "El código postal debe tener 5 dígitos"
                        }
                    })}
                    placeholder="28000"
                    autoComplete="postal-code"
                />
                {errors.postalCode && <p className="error-message">{errors.postalCode.message}</p>}
            </div>
        </form>
    )
}

export default StepAddress;
