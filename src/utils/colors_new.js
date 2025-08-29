/**
 * Simplified color utility functions - only the ones actually used
 */

// Status colors
const StatusColors = {
  EVENT_STATUS: {
    confirmed: '#10b981',    // Green
    pending: '#f59e0b',      // Orange/Yellow
    cancelled: '#ef4444',    // Red
    ongoing: '#3b82f6',      // Blue
    ended: '#6b7280'         // Gray
  },
  ZONE_STATUS: {
    normal: '#10b981',       // Green
    warning: '#f59e0b',      // Orange/Yellow
    critical: '#ef4444'      // Red
  },
  ALERT_TYPE: {
    info: '#3b82f6',         // Blue
    warning: '#f59e0b',      // Orange/Yellow
    error: '#ef4444',        // Red
    success: '#10b981'       // Green
  },
  EVENT_TYPE: {
    conference: '#3b82f6',   // Blue
    exhibition: '#8b5cf6',   // Purple
    entertainment: '#ec4899', // Pink
    food: '#f59e0b',         // Orange
    business: '#059669',     // Teal
    workshop: '#dc2626',     // Dark red
    general: '#6b7280'       // Gray
  }
};

/**
 * Get color for event status (used by EventSchedule and DashboardView)
 */
export const getEventStatusColor = (status) => {
  return StatusColors.EVENT_STATUS[status] || StatusColors.EVENT_STATUS.pending;
};

/**
 * Get color for event type (used by EventSchedule)
 */
export const getEventTypeColor = (type) => {
  return StatusColors.EVENT_TYPE[type] || StatusColors.EVENT_TYPE.general;
};

/**
 * Get color for crowd/zone status (used by CrowdManagement)
 */
export const getCrowdStatusColor = (status) => {
  return StatusColors.ZONE_STATUS[status] || StatusColors.ZONE_STATUS.normal;
};

/**
 * Get color for alert type (used by DashboardView)
 */
export const getAlertTypeColor = (type) => {
  return StatusColors.ALERT_TYPE[type] || StatusColors.ALERT_TYPE.info;
};

export default {
  StatusColors,
  getEventStatusColor,
  getEventTypeColor,
  getCrowdStatusColor,
  getAlertTypeColor
};
