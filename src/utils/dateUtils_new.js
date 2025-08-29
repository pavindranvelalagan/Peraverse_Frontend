/**
 * Simplified date utility functions - only the ones actually used
 */

/**
 * Format date for display (used by EventSchedule)
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  return new Date(date).toLocaleDateString('en-US', formatOptions);
};

/**
 * Format time for display (used by EventSchedule and Information)
 */
export const formatTime = (time, options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', formatOptions);
};

/**
 * Check if a date is today (used by EventSchedule)
 */
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return today.toDateString() === checkDate.toDateString();
};

/**
 * Check if a date is in this week (used by EventSchedule)
 */
export const isThisWeek = (date, referenceDate = new Date()) => {
  const checkDate = new Date(date);
  const refDate = new Date(referenceDate);
  
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(refDate);
  startOfWeek.setDate(refDate.getDate() - refDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  // Get the end of the week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return checkDate >= startOfWeek && checkDate <= endOfWeek;
};

export default {
  formatDate,
  formatTime,
  isToday,
  isThisWeek
};
