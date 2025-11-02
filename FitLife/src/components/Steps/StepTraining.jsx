import React, { useEffect, useState } from 'react';

function StepTraining({ initialData, setCanNext, setStepData }) {
    // TODO: Crear estado para trainingType usando initialData

    useEffect(() => {
        // TODO: Validar que se haya seleccionado un tipo de entrenamiento
        // TODO: Llamar a setCanNext(true) si es válido
        // TODO: Guardar datos con setStepData si son válidos
    }, []);

    return (
        <div>
            <h2>Paso 3: Elegir Entrenamiento</h2>
            {/* TODO: Añadir select con opciones de entrenamiento (cardio, fuerza, yoga, etc.) */}
        </div>
    );
}

export default StepTraining;