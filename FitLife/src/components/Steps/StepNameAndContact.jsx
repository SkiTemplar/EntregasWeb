import React, { useEffect, useState } from 'react';

function StepNameAndContact({ initialData, setCanNext, setStepData }) {
    // TODO: Crear estados para name, email y phone usando initialData

    useEffect(() => {
        // TODO: Validar los datos cuando cambien
        // TODO: Llamar a setCanNext(true) si todos los datos son válidos
        // TODO: Guardar datos con setStepData si son válidos
    }, []);

    return (
        <div>
            <h2>Paso 1: Nombre y Contacto</h2>
            {/* TODO: Añadir campos de formulario para nombre, email y teléfono */}
        </div>
    );
}

export default StepNameAndContact;
