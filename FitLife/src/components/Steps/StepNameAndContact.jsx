import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

function StepNameAndContact({ proceedNext, initialData = {}, setCanNext, setStepData, setSubmitCurrentStep }) {
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
        console.log("StepNameAndContact submitted:", data);
    }, [setStepData, proceedNext]);

    useEffect(() => {
        setSubmitCurrentStep(() => handleSubmit(onSubmit));
    }, [handleSubmit, onSubmit, setSubmitCurrentStep]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2> Datos de Información </h2>
            <div>
                <label htmlFor="name">Nombre Completo:</label>
                <input
                    id="name"
                    {...register("name", {
                        required: "El nombre es obligatorio",
                        minLength: {value: 3, message: "El nombre debe tener al menos 3 caracteres"}
                    })}
                    placeholder="Nombre y Apellido"
                    autoComplete= "name"
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "El formato del email es inválido"
                        }
                    })}
                    placeholder="correo@gmail.com"
                    autoComplete="email"
                    inputMode="email"
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="phone">Teléfono</label>
                <input
                    id="email"
                    {...register("phone", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^\+?[0-9]{7,15}$/,
                            message: "El formato del teléfono es inválido"
                        }
                    })}
                    placeholder="987654321"
                    autoComplete="phone"
                    inputMode= "tel"
                />
                {errors.phone && <p>{errors.phone.message}</p>}
            </div>
        </form>
    )
}

export default StepNameAndContact;
