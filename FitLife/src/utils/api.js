// Función para simular envío de datos al servidor

// Simulación de registro (sin servidor real)
export const mockSubmitRegistration = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Datos del usuario registrado:', userData);
      resolve({
        success: true,
        data: {
          userId: Math.random().toString(36).substr(2, 9)
        }
      });
    }, 1500); // Simula un retraso de red
  });
};

