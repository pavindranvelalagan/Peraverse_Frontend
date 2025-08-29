import React, { useState, useEffect } from 'react';
import { 
  Info, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  AlertCircle,
  Star,
  LucideIcon
} from 'lucide-react';
import { formatTime } from '../utils/dateUtils';
import { LoadingView, ErrorView } from '../utils/uiHelpers';
import { getFacilityIcon } from '../utils/iconHelpers';
import './Information.css';

interface VenueInfo {
  description?: string;
  totalCapacity?: number;
  address?: string;
  rating?: number;
  phone?: string;
  emergencyPhone?: string;
  email?: string;
  eventsEmail?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface Facility {
  name: string;
  description: string;
  type: string;
  hours?: string;
}

interface OperatingHours {
  day: string;
  open: string;
  close: string;
  note?: string;
}

interface Announcement {
  title: string;
  message: string;
  date: Date;
  priority: 'high' | 'normal';
}

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const Information: React.FC = () => {
  const [venueInfo, setVenueInfo] = useState<VenueInfo | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  // Mock data for frontend-only version
  const mockVenueInfo: VenueInfo = {
    description: 'Welcome to our state-of-the-art venue facility, designed to host a wide variety of events and provide exceptional experiences for all visitors.',
    totalCapacity: 5000,
    address: '123 Convention Center Blvd, City, State 12345',
    rating: 4.8,
    phone: '(555) 123-4567',
    emergencyPhone: '(555) 123-4911',
    email: 'info@venue.com',
    eventsEmail: 'events@venue.com',
    city: 'City',
    state: 'State',
    zipCode: '12345'
  };

  const mockFacilities: Facility[] = [
    { name: 'Free WiFi', description: 'High-speed internet access throughout the venue', type: 'wifi', hours: '24/7' },
    { name: 'Parking', description: 'Ample parking spaces available for all visitors', type: 'parking', hours: '6:00 AM - 12:00 AM' },
    { name: 'Food Court', description: 'Various dining options and refreshment areas', type: 'restaurant', hours: '9:00 AM - 9:00 PM' },
    { name: 'Gift Shop', description: 'Souvenirs and venue merchandise available', type: 'shop', hours: '10:00 AM - 8:00 PM' },
    { name: 'Medical Center', description: 'First aid and medical assistance on-site', type: 'medical', hours: '8:00 AM - 10:00 PM' },
    { name: 'Information Desk', description: 'Helpful staff to assist with directions and queries', type: 'navigation', hours: '8:00 AM - 10:00 PM' }
  ];

  const mockOperatingHours: OperatingHours[] = [
    { day: 'Monday - Friday', open: '8:00 AM', close: '10:00 PM' },
    { day: 'Saturday', open: '9:00 AM', close: '11:00 PM' },
    { day: 'Sunday', open: '10:00 AM', close: '9:00 PM' },
    { day: 'Special Events', open: 'Variable', close: 'Variable', note: 'Hours may vary during special events and holidays' }
  ];

  const mockAnnouncements: Announcement[] = [
    {
      title: 'New Security Protocols',
      message: 'Enhanced security measures are now in place for all visitors. Please allow extra time for entry procedures.',
      date: new Date(Date.now() - 86400000), // 1 day ago
      priority: 'high'
    },
    {
      title: 'WiFi Network Upgrade',
      message: 'Our WiFi network has been upgraded for better performance. Connect to "VenueWiFi-2024" for the fastest speeds.',
      date: new Date(Date.now() - 172800000), // 2 days ago
      priority: 'normal'
    }
  ];

  useEffect(() => {
    loadInformationData();
  }, []);

  const loadInformationData = (): void => {
    try {
      setLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setVenueInfo(mockVenueInfo);
        setFacilities(mockFacilities);
        setOperatingHours(mockOperatingHours);
        setAnnouncements(mockAnnouncements);
        setError(null);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Error loading venue information');
      console.error('Information loading error:', err);
      setLoading(false);
    }
  };

  const categories: Category[] = [
    { id: 'general', label: 'General Info', icon: Info },
    { id: 'facilities', label: 'Facilities', icon: MapPin },
    { id: 'hours', label: 'Operating Hours', icon: Clock },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'announcements', label: 'Announcements', icon: AlertCircle }
  ];

  if (loading) {
    return <LoadingView message="Loading venue information..." />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={loadInformationData} icon={Info} />;
  }

  return (
    <div className="information-container">
      <div className="information-header">
        <h1 className="text-3xl mb-4">Venue Information</h1>
        <p className="information-subtitle">
          Essential information about our venue, facilities, and services
        </p>
      </div>

      <div className="grid grid-2">
        {/* Category Navigation */}
        <div className="card">
          <h2 className="text-2xl mb-4">Information Categories</h2>
          <div className="information-nav-container">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`information-nav-button ${selectedCategory === category.id ? 'active' : ''}`}
                >
                  <IconComponent 
                    size={20} 
                    color={selectedCategory === category.id ? '#3b82f6' : '#6b7280'} 
                  />
                  <span>
                    {category.label}
                  </span>
                  {category.id === 'announcements' && announcements.length > 0 && (
                    <span className="information-nav-badge">
                      {announcements.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Information Content */}
        <div className="card">
          {selectedCategory === 'general' && venueInfo && (
            <div>
              <h2 className="text-2xl mb-4">General Information</h2>
              <div className="information-content-container">
                <div className="information-section">
                  <h3>About the Venue</h3>
                  <p>
                    {venueInfo.description || 'Welcome to our state-of-the-art venue facility, designed to host a wide variety of events and provide exceptional experiences for all visitors.'}
                  </p>
                </div>
                
                <div className="information-section">
                  <h3>Capacity</h3>
                  <div className="information-detail-item">
                    <Users size={16} color="#6b7280" />
                    <span>
                      Maximum capacity: {venueInfo.totalCapacity || '5,000'} people
                    </span>
                  </div>
                </div>

                <div className="information-section">
                  <h3>Location</h3>
                  <div className="information-detail-item">
                    <MapPin size={16} color="#6b7280" />
                    <span>
                      {venueInfo.address || '123 Convention Center Blvd, City, State 12345'}
                    </span>
                  </div>
                </div>

                <div className="information-section">
                  <h3>Rating</h3>
                  <div className="information-detail-item">
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <span>
                      {venueInfo.rating || '4.8'}/5.0 (Based on visitor reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'facilities' && (
            <div>
              <h2 className="text-2xl mb-4">Facilities & Amenities</h2>
              <div className="information-facilities-grid">
                {facilities.length > 0 ? facilities.map((facility, index) => {
                  const IconComponent = getFacilityIcon(facility.type);
                  return (
                    <div key={index} className="information-facility-card">
                      <div className="information-facility-header">
                        <IconComponent size={20} color="#3b82f6" />
                        <h4>{facility.name}</h4>
                      </div>
                      <p className="information-facility-description">
                        {facility.description}
                      </p>
                      {facility.hours && (
                        <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                          Hours: {facility.hours}
                        </p>
                      )}
                    </div>
                  );
                }) : (
                  // Default facilities if none loaded
                  mockFacilities.map((facility, index) => {
                    const IconComponent = getFacilityIcon(facility.type);
                    return (
                      <div key={index} className="information-facility-card">
                        <div className="information-facility-header">
                          <IconComponent size={20} color="#3b82f6" />
                          <h4>{facility.name}</h4>
                        </div>
                        <p className="information-facility-description">
                          {facility.description}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {selectedCategory === 'hours' && (
            <div>
              <h2 className="text-2xl mb-4">Operating Hours</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {operatingHours.length > 0 ? operatingHours.map((schedule, index) => (
                  <div key={index} className="information-facility-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600' }}>{schedule.day}</span>
                      <span style={{ color: '#6b7280' }}>
                        {schedule.open} - {schedule.close}
                      </span>
                    </div>
                    {schedule.note && (
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {schedule.note}
                      </p>
                    )}
                  </div>
                )) : (
                  // Default hours if none loaded
                  mockOperatingHours.map((schedule, index) => (
                    <div key={index} className="information-facility-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600' }}>{schedule.day}</span>
                        <span style={{ color: '#6b7280' }}>
                          {schedule.open} - {schedule.close}
                        </span>
                      </div>
                      {schedule.note && (
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                          {schedule.note}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {selectedCategory === 'contact' && venueInfo && (
            <div>
              <h2 className="text-2xl mb-4">Contact Information</h2>
              <div className="information-content-container">
                <div className="information-facility-card">
                  <div className="information-facility-header">
                    <Phone size={20} color="#3b82f6" />
                    <h3>Phone</h3>
                  </div>
                  <p style={{ color: '#6b7280' }}>
                    Main: {venueInfo.phone || '(555) 123-4567'}
                  </p>
                  <p style={{ color: '#6b7280' }}>
                    Emergency: {venueInfo.emergencyPhone || '(555) 123-4911'}
                  </p>
                </div>

                <div className="information-facility-card">
                  <div className="information-facility-header">
                    <Mail size={20} color="#3b82f6" />
                    <h3>Email</h3>
                  </div>
                  <p style={{ color: '#6b7280' }}>
                    General: {venueInfo.email || 'info@venue.com'}
                  </p>
                  <p style={{ color: '#6b7280' }}>
                    Events: {venueInfo.eventsEmail || 'events@venue.com'}
                  </p>
                </div>

                <div className="information-facility-card">
                  <div className="information-facility-header">
                    <MapPin size={20} color="#3b82f6" />
                    <h3>Address</h3>
                  </div>
                  <p style={{ color: '#6b7280' }}>
                    {venueInfo.address || '123 Convention Center Blvd'}
                  </p>
                  <p style={{ color: '#6b7280' }}>
                    {venueInfo.city || 'City'}, {venueInfo.state || 'State'} {venueInfo.zipCode || '12345'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'announcements' && (
            <div>
              <h2 className="text-2xl mb-4">Important Announcements</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {announcements.length > 0 ? announcements.map((announcement, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: announcement.priority === 'high' ? '#fef2f2' : '#f9fafb',
                    borderColor: announcement.priority === 'high' ? '#fecaca' : '#e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <AlertCircle 
                        size={20} 
                        color={announcement.priority === 'high' ? '#ef4444' : '#3b82f6'} 
                      />
                      <h3 style={{ fontWeight: '600' }}>{announcement.title}</h3>
                      <span style={{ 
                        marginLeft: 'auto', 
                        fontSize: '0.75rem', 
                        color: '#6b7280' 
                      }}>
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                      {announcement.message}
                    </p>
                  </div>
                )) : (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#6b7280'
                  }}>
                    <AlertCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No current announcements</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Information;
