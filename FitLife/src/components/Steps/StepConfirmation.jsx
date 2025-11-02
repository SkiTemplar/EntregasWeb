import React from 'react';

function StepConfirmation({ formData, onBack }) {
    // formData contiene todos los datos de los pasos anteriores
    const {
        nameContact = {},
        address = {},
        training = {},
        payment = {}
    } = formData || {};

    // Función para enviar los datos finales
    const handleConfirm = () => {
        console.log("Datos finales del registro:", formData);
        alert("¡Registro completado con éxito!");
        // Aquí iría la petición HTTP al servidor
    };

    return (
        <div className="confirmation-container">
            <h2 className="step-title">Paso 5: Confirmación</h2>
            <p className="confirmation-subtitle">¡Gracias por completar el registro! Revisa tus datos antes de confirmar:</p>

            <div className="confirmation-sections">
                {/* Resumen de Datos Personales */}
                <section className="confirmation-section">
                    <h3 className="section-title">📋 Datos Personales</h3>
                    <div className="section-content">
                        <p><strong>Nombre:</strong> {nameContact.name}</p>
                        <p><strong>Email:</strong> {nameContact.email}</p>
                        <p><strong>Teléfono:</strong> {nameContact.phone}</p>
                    </div>
                </section>

                {/* Resumen de Dirección */}
                <section className="confirmation-section">
                    <h3 className="section-title">📍 Dirección</h3>
                    <div className="section-content">
                        <p><strong>Dirección:</strong> {address.address}</p>
                        <p><strong>Ciudad:</strong> {address.city}</p>
                        <p><strong>Código Postal:</strong> {address.postalCode}</p>
                    </div>
                </section>

                {/* Resumen de Preferencias de Entrenamiento */}
                <section className="confirmation-section">
                    <h3 className="section-title">💪 Preferencias de Entrenamiento</h3>
                    <div className="section-content">
                        <p><strong>Tipo de Entrenamiento:</strong> {training.trainingType}</p>
                        <p><strong>Objetivo:</strong> {training.goal}</p>
                        <p><strong>Disponibilidad:</strong> {training.availability}</p>
                    </div>
                </section>

                {/* Resumen de Pago */}
                <section className="confirmation-section">
                    <h3 className="section-title">💳 Información de Pago</h3>
                    <div className="section-content">
                        <p><strong>Plan:</strong> {payment.plan === 'monthly' ? 'Mensual - 29.99€/mes' : 'Anual - 299.99€/año'}</p>
                        <p><strong>Tarjeta:</strong> **** **** **** {payment.cardNumber?.slice(-4)}</p>
                        <p><strong>Titular:</strong> {payment.cardName}</p>
                    </div>
                </section>
            </div>

            {/* Botones de acción */}
            <div className="confirmation-buttons">
                <button className="btn-secondary" onClick={onBack}>Volver y Editar</button>
                <button className="btn-primary" onClick={handleConfirm}>Confirmar Registro</button>
            </div>
        </div>
    );
}

export default StepConfirmation;