import React, { useEffect, useState } from 'react';

function StepAddress({ initialData, setCanNext, setStepData }) {
    // TODO: Crear estados para address, city y postalCode usando initialData

    useEffect(() => {
        // TODO: Validar los datos cuando cambien
        // TODO: Llamar a setCanNext(true) si todos los datos son válidos
        // TODO: Guardar datos con setStepData si son válidos
    }, []);

    return (
        <div>
            <h2>Paso 2: Dirección</h2>
            {/* TODO: Añadir campos de formulario para dirección, ciudad y código postal */}
        </div>
    );
}

export default StepAddress;
