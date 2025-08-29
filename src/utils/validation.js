/**
 * Common validation functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate required field
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim().length > 0;
};

/**
 * Validate string length
 */
export const isValidLength = (value, min = 0, max = Infinity) => {
  if (!value) return min === 0;
  const length = value.toString().length;
  return length >= min && length <= max;
};

/**
 * Validate number range
 */
export const isInRange = (value, min = -Infinity, max = Infinity) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Validate non-negative number
 */
export const isNonNegativeNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num >= 0;
};

/**
 * Validate date format (YYYY-MM-DD)
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && date === parsedDate.toISOString().split('T')[0];
};

/**
 * Validate time format (HH:MM)
 */
export const isValidTime = (time) => {
  if (!time) return false;
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Validate date is not in the past
 */
export const isNotPastDate = (date) => {
  if (!isValidDate(date)) return false;
  return new Date(date) >= new Date().setHours(0, 0, 0, 0);
};

/**
 * Validate end time is after start time
 */
export const isEndTimeAfterStartTime = (startTime, endTime) => {
  if (!isValidTime(startTime) || !isValidTime(endTime)) return false;
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  return end > start;
};

/**
 * Validate capacity constraints
 */
export const isValidCapacity = (current, capacity) => {
  return isNonNegativeNumber(current) && 
         isPositiveNumber(capacity) && 
         Number(current) <= Number(capacity);
};

/**
 * Form validation helper
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    
    for (const rule of fieldRules) {
      if (typeof rule === 'function') {
        const result = rule(value);
        if (result !== true) {
          errors[field] = result;
          break;
        }
      } else if (typeof rule === 'object') {
        const { validator, message } = rule;
        if (!validator(value)) {
          errors[field] = message;
          break;
        }
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (message = 'This field is required') => ({
    validator: isRequired,
    message
  }),
  
  email: (message = 'Please enter a valid email address') => ({
    validator: isValidEmail,
    message
  }),
  
  phone: (message = 'Please enter a valid phone number') => ({
    validator: isValidPhone,
    message
  }),
  
  url: (message = 'Please enter a valid URL') => ({
    validator: isValidUrl,
    message
  }),
  
  minLength: (min, message) => ({
    validator: (value) => isValidLength(value, min),
    message: message || `Must be at least ${min} characters long`
  }),
  
  maxLength: (max, message) => ({
    validator: (value) => isValidLength(value, 0, max),
    message: message || `Must be no more than ${max} characters long`
  }),
  
  range: (min, max, message) => ({
    validator: (value) => isInRange(value, min, max),
    message: message || `Must be between ${min} and ${max}`
  }),
  
  positive: (message = 'Must be a positive number') => ({
    validator: isPositiveNumber,
    message
  }),
  
  nonNegative: (message = 'Must be a non-negative number') => ({
    validator: isNonNegativeNumber,
    message
  }),
  
  date: (message = 'Please enter a valid date') => ({
    validator: isValidDate,
    message
  }),
  
  time: (message = 'Please enter a valid time') => ({
    validator: isValidTime,
    message
  }),
  
  futureDate: (message = 'Date must be in the future') => ({
    validator: isNotPastDate,
    message
  })
};

/**
 * Event validation schema
 */
export const eventValidationSchema = {
  title: [
    ValidationRules.required(),
    ValidationRules.minLength(3),
    ValidationRules.maxLength(100)
  ],
  date: [
    ValidationRules.required(),
    ValidationRules.date(),
    ValidationRules.futureDate()
  ],
  startTime: [
    ValidationRules.required(),
    ValidationRules.time()
  ],
  endTime: [
    ValidationRules.required(),
    ValidationRules.time()
  ],
  location: [
    ValidationRules.required(),
    ValidationRules.minLength(3),
    ValidationRules.maxLength(100)
  ],
  attendees: [
    ValidationRules.nonNegative(),
    ValidationRules.range(0, 10000)
  ],
  description: [
    ValidationRules.maxLength(500)
  ]
};

/**
 * Zone validation schema
 */
export const zoneValidationSchema = {
  name: [
    ValidationRules.required(),
    ValidationRules.minLength(3),
    ValidationRules.maxLength(50)
  ],
  capacity: [
    ValidationRules.required(),
    ValidationRules.positive(),
    ValidationRules.range(1, 50000)
  ],
  current: [
    ValidationRules.nonNegative()
  ]
};

/**
 * Alert validation schema
 */
export const alertValidationSchema = {
  message: [
    ValidationRules.required(),
    ValidationRules.minLength(10),
    ValidationRules.maxLength(200)
  ],
  type: [
    ValidationRules.required(),
    {
      validator: (value) => ['info', 'warning', 'error', 'success'].includes(value),
      message: 'Invalid alert type'
    }
  ],
  priority: [
    ValidationRules.required(),
    {
      validator: (value) => ['low', 'normal', 'high', 'critical'].includes(value),
      message: 'Invalid priority level'
    }
  ]
};

export default {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isRequired,
  isValidLength,
  isInRange,
  isPositiveNumber,
  isNonNegativeNumber,
  isValidDate,
  isValidTime,
  isNotPastDate,
  isEndTimeAfterStartTime,
  isValidCapacity,
  validateForm,
  ValidationRules,
  eventValidationSchema,
  zoneValidationSchema,
  alertValidationSchema
};
