// Email validation
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (basic international format)
exports.isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

// Product code validation
exports.isValidProductCode = (code) => {
  return code && code.trim().length > 0;
};

// Name validation
exports.isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// OTP validation
exports.isValidOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};