export const validateEnquiryForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.emailVerified) {
    errors.emailVerified = 'Please verify your email';
  }

  if (!formData.phoneVerified) {
    errors.phoneVerified = 'Please verify your phone number';
  }

  return errors;
};

export const validateBulkEnquiryForm = (formData) => {
  const errors = {};

  if (!formData.companyName || formData.companyName.trim().length < 2) {
    errors.companyName = 'Company name must be at least 2 characters long';
  }

  if (!formData.contactPerson || formData.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Contact person name must be at least 2 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.products || formData.products.length === 0) {
    errors.products = 'Please add at least one product';
  }

  if (!formData.emailVerified) {
    errors.emailVerified = 'Please verify your email';
  }

  if (!formData.phoneVerified) {
    errors.phoneVerified = 'Please verify your phone number';
  }

  return errors;
};

export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters long';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
};