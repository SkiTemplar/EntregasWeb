import React, { useEffect, useState } from 'react';

function StepPayment({ initialData, setCanNext, setStepData }) {
    // TODO: Crear estados para cardNumber y cardName usando initialData

    useEffect(() => {
        // TODO: Validar número de tarjeta (16 dígitos) y nombre
        // TODO: Llamar a setCanNext(true) si todos los datos son válidos
        // TODO: Guardar datos con setStepData si son válidos
    }, []);

    return (
        <div>
            <h2>Paso 4: Pago</h2>
            {/* TODO: Añadir campos para número de tarjeta y nombre en tarjeta */}
        </div>
    );
}

export default StepPayment;