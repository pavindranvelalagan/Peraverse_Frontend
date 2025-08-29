/**
 * Centralized icon mapping utility
 */
import { 
  Users, 
  AlertTriangle, 
  MapPin, 
  Activity, 
  Shield, 
  Settings,
  Calendar,
  Clock,
  Phone,
  Mail,
  Info,
  Car,
  Wifi,
  Coffee,
  Utensils,
  ShoppingBag,
  Heart,
  Navigation,
  Camera,
  Music,
  Gift,
  Star,
  Plus,
  Edit3,
  Trash2,
  Filter
} from 'lucide-react';

/**
 * Get facility icon by type
 */
export const getFacilityIcon = (type) => {
  const icons = {
    'parking': Car,
    'wifi': Wifi,
    'cafe': Coffee,
    'restaurant': Utensils,
    'shop': ShoppingBag,
    'medical': Heart,
    'navigation': Navigation,
    'security': AlertTriangle,
    'entertainment': Music,
    'photo': Camera,
    'gift': Gift,
    'default': Info
  };
  return icons[type] || icons.default;
};

/**
 * Get emergency action icon
 */
export const getEmergencyActionIcon = (actionId) => {
  const icons = {
    1: Shield,
    2: MapPin,
    3: Activity,
    4: Users
  };
  return icons[actionId] || Shield;
};

/**
 * Get category icon for information page
 */
export const getCategoryIcon = (categoryId) => {
  const icons = {
    'general': Info,
    'facilities': MapPin,
    'hours': Clock,
    'contact': Phone,
    'announcements': AlertTriangle
  };
  return icons[categoryId] || Info;
};

/**
 * Common icon collections
 */
export const icons = {
  // Navigation
  home: MapPin,
  calendar: Calendar,
  users: Users,
  info: Info,
  settings: Settings,
  
  // Actions
  add: Plus,
  edit: Edit3,
  delete: Trash2,
  filter: Filter,
  
  // Status
  warning: AlertTriangle,
  success: Activity,
  error: AlertTriangle,
  
  // Contact
  phone: Phone,
  email: Mail,
  location: MapPin,
  time: Clock,
  
  // Facilities
  parking: Car,
  wifi: Wifi,
  food: Utensils,
  coffee: Coffee,
  shopping: ShoppingBag,
  medical: Heart,
  entertainment: Music,
  photo: Camera
};

export default {
  getFacilityIcon,
  getEmergencyActionIcon,
  getCategoryIcon,
  icons
};
