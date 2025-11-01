// Utilidades para validaciones del formulario

// Validar email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validar teléfono
export const validatePhone = (phone) => {
  const re = /^[0-9]{9,}$/;
  return re.test(phone);
};

// Validar código postal
export const validatePostalCode = (code) => {
  const re = /^[0-9]{5}$/;
  return re.test(code);
};

// Validar tarjeta de crédito
export const validateCardNumber = (cardNumber) => {
  const re = /^[0-9]{16}$/;
  return re.test(cardNumber.replace(/\s/g, ''));
};

