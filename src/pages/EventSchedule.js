import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Edit3, Trash2, Filter } from 'lucide-react';
import { getEventStatusColor, getEventTypeColor } from '../utils/colors';
import { formatDate, formatTime, isToday, isThisWeek } from '../utils/dateUtils';
import { LoadingView, ErrorView, generateCalendarDays } from '../utils/uiHelpers';

const EventSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    venue: 'all'
  });

  // Mock data for frontend-only version
  const mockEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Conference",
      date: "2025-08-27",
      startTime: "09:00",
      endTime: "17:00",
      location: "Main Auditorium",
      type: "conference",
      status: "confirmed",
      attendees: 500,
      description: "Annual conference on the latest developments in AI and ML"
    },
    {
      id: 2,
      title: "Robotics Exhibition",
      date: "2025-08-28",
      startTime: "10:00",
      endTime: "18:00",
      location: "Exhibition Hall A",
      type: "exhibition",
      status: "confirmed",
      attendees: 300,
      description: "Showcase of cutting-edge robotics technology"
    },
    {
      id: 3,
      title: "Space Technology Workshop",
      date: "2025-08-29",
      startTime: "14:00",
      endTime: "16:00",
      location: "Workshop Room B",
      type: "workshop",
      status: "confirmed",
      attendees: 50,
      description: "Hands-on workshop on space technology applications"
    },
    {
      id: 4,
      title: "Innovation Expo",
      date: "2025-08-30",
      startTime: "09:00",
      endTime: "17:00",
      location: "Exhibition Hall B",
      type: "exhibition",
      status: "pending",
      attendees: 400,
      description: "Annual innovation showcase featuring startup companies"
    }
  ];

  const mockVenues = [
    { id: 1, name: "Main Auditorium" },
    { id: 2, name: "Exhibition Hall A" },
    { id: 3, name: "Exhibition Hall B" },
    { id: 4, name: "Workshop Room A" },
    { id: 5, name: "Workshop Room B" }
  ];

  useEffect(() => {
    loadEventData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters, viewMode, selectedDate]);

  const loadEventData = () => {
    try {
      setLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setEvents(mockEvents);
        setVenues(mockVenues);
        setError(null);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Error loading event data');
      console.error('Event data loading error:', err);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = events.filter(event => {
      // Type filter
      if (filters.type !== 'all' && event.type !== filters.type) return false;
      
      // Status filter
      if (filters.status !== 'all' && event.status !== filters.status) return false;
      
      // Venue filter
      if (filters.venue !== 'all' && event.location !== filters.venue) return false;
      
      // Date filter based on view mode
      const eventDate = new Date(event.date);
      switch (viewMode) {
        case 'day':
          return eventDate.toDateString() === selectedDate.toDateString();
        case 'week':
          return isThisWeek(eventDate, selectedDate);
        case 'month':
          return eventDate.getMonth() === selectedDate.getMonth() && 
                 eventDate.getFullYear() === selectedDate.getFullYear();
        default:
          return true;
      }
    });

    setFilteredEvents(filtered);
  };

  const handleCreateEvent = (eventData) => {
    // Simulate event creation
    console.log('Creating event:', eventData);
    setShowAddEvent(false);
    // In a real app, this would create a new event
  };

  const handleUpdateEvent = (eventId, eventData) => {
    // Simulate event update
    console.log('Updating event:', eventId, eventData);
    // In a real app, this would update the event
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Simulate event deletion
      console.log('Deleting event:', eventId);
      // In a real app, this would delete the event
    }
  };

  if (loading) {
    return <LoadingView message="Loading event schedule..." />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={loadEventData} icon={Calendar} title="Error Loading Events" />;
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return filteredEvents
      .filter(event => new Date(event.date) > today)
      .slice(0, 5);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <div>
          <h1 className="text-3xl mb-4">Event Schedule</h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              A quick Look at the upcoming special events!
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddEvent(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} />
            <span style={{ fontWeight: '500' }}>Filters:</span>
          </div>
          
          <select 
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">All Types</option>
            <option value="conference">Conference</option>
            <option value="exhibition">Exhibition</option>
            <option value="entertainment">Entertainment</option>
            <option value="food">Food & Beverage</option>
            <option value="business">Business</option>
            <option value="workshop">Workshop</option>
          </select>

          <select 
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select 
            value={filters.venue}
            onChange={(e) => setFilters(prev => ({ ...prev, venue: e.target.value }))}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">All Venues</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.name}>{venue.name}</option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: '0.25rem', marginLeft: 'auto' }}>
            <button
              onClick={() => setViewMode('day')}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                backgroundColor: viewMode === 'day' ? '#3b82f6' : 'white',
                color: viewMode === 'day' ? 'white' : '#374151',
                borderRadius: '6px 0 0 6px',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                backgroundColor: viewMode === 'week' ? '#3b82f6' : 'white',
                color: viewMode === 'week' ? 'white' : '#374151',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                backgroundColor: viewMode === 'month' ? '#3b82f6' : 'white',
                color: viewMode === 'month' ? 'white' : '#374151',
                borderRadius: '0 6px 6px 0',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Calendar */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="text-2xl">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ←
              </button>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                →
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1px',
            backgroundColor: '#e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                {day}
              </div>
            ))}
            
            {generateCalendarDays(selectedDate).map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} style={{
                  minHeight: '80px',
                  padding: '0.5rem',
                  backgroundColor: 'white',
                  opacity: isCurrentMonth ? 1 : 0.5,
                  position: 'relative',
                  cursor: 'pointer',
                  border: isToday ? '2px solid #3b82f6' : 'none'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: isToday ? '700' : '500',
                    color: isToday ? '#3b82f6' : '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    {day.getDate()}
                  </div>
                  
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <div key={eventIndex} style={{
                      fontSize: '0.625rem',
                      padding: '1px 4px',
                      marginBottom: '1px',
                      backgroundColor: getEventTypeColor(event.type),
                      color: 'white',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {event.title}
                    </div>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <div style={{
                      fontSize: '0.625rem',
                      color: '#6b7280',
                      textAlign: 'center'
                    }}>
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event List */}
        <div className="card">
          <h2 className="text-2xl mb-4">Upcoming Events</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {getUpcomingEvents().map((event) => (
              <div key={event.id} style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                borderLeft: `4px solid ${getEventTypeColor(event.type)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{event.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={14} />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={14} />
                        {event.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={14} />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: event.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                      color: event.status === 'confirmed' ? '#166534' : '#92400e'
                    }}>
                      {event.status}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button style={{
                        padding: '0.25rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}>
                        <Edit3 size={14} />
                      </button>
                      <button style={{
                        padding: '0.25rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Events */}
      <div className="card">
        <h2 className="text-2xl mb-4">Today's Events - {formatDate(new Date())}</h2>
        {getTodayEvents().length > 0 ? (
          <div className="grid grid-3">
            {getTodayEvents().map((event) => (
              <div key={event.id} style={{
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                borderTop: `4px solid ${getEventTypeColor(event.type)}`
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{event.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} />
                    {event.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={16} />
                    {event.attendees} attendees
                  </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: getEventTypeColor(event.type),
                    color: 'white'
                  }}>
                    {event.type}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: getEventStatusColor(event.status)
                  }}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#6b7280' 
          }}>
            <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No events scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSchedule;
