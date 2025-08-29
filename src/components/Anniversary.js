import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Calendar, Clock, Star, Heart } from 'lucide-react';

const Anniversary = ({ 
  years = 75,
  theme = 'celebration', // 'celebration', 'elegant', 'modern'
  showCountdown = true,
  events = [],
  className = ''
}) => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  const defaultEvents = [
    {
      id: 1,
      title: 'Grand Opening Ceremony',
      date: '2025-09-15',
      time: '10:00 AM',
      description: 'Join us for the spectacular opening of our 75th anniversary celebrations',
      image: '/images/ceremony.jpg',
      location: 'Main Auditorium'
    },
    {
      id: 2,
      title: 'Alumni Reunion Gala',
      date: '2025-10-20',
      time: '7:00 PM',
      description: 'A special evening to reconnect with fellow alumni and celebrate our legacy',
      image: '/images/gala.jpg',
      location: 'Grand Ballroom'
    },
    {
      id: 3,
      title: 'Innovation Showcase',
      date: '2025-11-10',
      time: '2:00 PM',
      description: 'Discover groundbreaking research and innovations from our community',
      image: '/images/innovation.jpg',
      location: 'Science Complex'
    },
    {
      id: 4,
      title: 'Closing Celebration',
      date: '2025-12-15',
      time: '6:00 PM',
      description: 'A grand finale to our year-long 75th anniversary celebration',
      image: '/images/celebration.jpg',
      location: 'Campus Grounds'
    }
  ];

  const celebrationEvents = events.length > 0 ? events : defaultEvents;

  useEffect(() => {
    if (showCountdown && celebrationEvents.length > 0) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const eventDate = new Date(celebrationEvents[currentEvent].date).getTime();
        const difference = eventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        } else {
          setTimeLeft({});
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentEvent, celebrationEvents, showCountdown]);

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % celebrationEvents.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + celebrationEvents.length) % celebrationEvents.length);
  };

  const renderCountdown = () => {
    if (!showCountdown || Object.keys(timeLeft).length === 0) return null;

    return (
      <div style={styles.countdown}>
        <h3 style={styles.countdownTitle}>Next Event Countdown</h3>
        <div style={styles.countdownGrid}>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.days || 0}</div>
            <div style={styles.countdownLabel}>Days</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.hours || 0}</div>
            <div style={styles.countdownLabel}>Hours</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.minutes || 0}</div>
            <div style={styles.countdownLabel}>Minutes</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.seconds || 0}</div>
            <div style={styles.countdownLabel}>Seconds</div>
          </div>
        </div>
      </div>
    );
  };

  const renderEventCard = (event, index) => (
    <div key={event.id} style={styles.eventCard}>
      <div style={styles.eventImageContainer}>
        <div 
          style={{
            ...styles.eventImage,
            backgroundImage: `url(${event.image})`
          }}
        />
        <div style={styles.eventOverlay}>
          <Star style={styles.eventIcon} />
        </div>
      </div>
      <div style={styles.eventContent}>
        <h4 style={styles.eventTitle}>{event.title}</h4>
        <div style={styles.eventMeta}>
          <div style={styles.eventDate}>
            <Calendar size={16} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div style={styles.eventTime}>
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
        </div>
        <p style={styles.eventDescription}>{event.description}</p>
        <div style={styles.eventLocation}>{event.location}</div>
      </div>
    </div>
  );

  return (
    <div className={`anniversary ${theme} ${className}`} style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.sparkleContainer}>
            <Sparkles style={styles.sparkle} />
            <Gift style={styles.giftIcon} />
            <Sparkles style={styles.sparkle} />
          </div>
          <h1 style={styles.heroTitle}>
            Celebrating <span style={styles.yearHighlight}>{years} Years</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Of Excellence, Innovation, and Academic Achievement
          </p>
          <div style={styles.decorativeLine}>
            <Heart style={styles.heartIcon} />
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      {renderCountdown()}

      {/* Events Section */}
      <div style={styles.eventsSection}>
        <h2 style={styles.eventsTitle}>Anniversary Events</h2>
        
        {celebrationEvents.length > 0 && (
          <div style={styles.featuredEvent}>
            <h3 style={styles.featuredTitle}>Featured Event</h3>
            {renderEventCard(celebrationEvents[currentEvent], currentEvent)}
            
            <div style={styles.eventNavigation}>
              <button 
                onClick={prevEvent}
                style={styles.navButton}
                aria-label="Previous event"
              >
                ←
              </button>
              <div style={styles.eventIndicators}>
                {celebrationEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEvent(index)}
                    style={{
                      ...styles.indicator,
                      ...(index === currentEvent ? styles.activeIndicator : {})
                    }}
                    aria-label={`Event ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextEvent}
                style={styles.navButton}
                aria-label="Next event"
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* All Events Grid */}
        <div style={styles.eventsGrid}>
          {celebrationEvents.map((event, index) => renderEventCard(event, index))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    color: 'white'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  sparkleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2rem'
  },
  sparkle: {
    color: '#ffd700',
    animation: 'sparkle 2s infinite'
  },
  giftIcon: {
    color: '#ffd700',
    size: '48px'
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  yearHighlight: {
    color: '#ffd700',
    textShadow: '0 0 20px rgba(255,215,0,0.5)'
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: 0.9,
    marginBottom: '2rem'
  },
  decorativeLine: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heartIcon: {
    color: '#ff6b6b'
  },
  countdown: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '4rem',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
  },
  countdownTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#ffd700'
  },
  countdownGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto'
  },
  countdownItem: {
    textAlign: 'center'
  },
  countdownNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ffd700'
  },
  countdownLabel: {
    fontSize: '0.9rem',
    opacity: 0.8
  },
  eventsSection: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  eventsTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#ffd700'
  },
  featuredEvent: {
    marginBottom: '4rem'
  },
  featuredTitle: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#ffd700'
  },
  eventCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease'
  },
  eventImageContainer: {
    position: 'relative',
    height: '200px'
  },
  eventImage: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  eventOverlay: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(255,215,0,0.9)',
    borderRadius: '50%',
    padding: '0.5rem'
  },
  eventIcon: {
    color: '#667eea'
  },
  eventContent: {
    padding: '1.5rem'
  },
  eventTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ffd700'
  },
  eventMeta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  eventDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    opacity: 0.9
  },
  eventTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    opacity: 0.9
  },
  eventDescription: {
    marginBottom: '1rem',
    lineHeight: '1.6',
    opacity: 0.9
  },
  eventLocation: {
    fontSize: '0.9rem',
    opacity: 0.8,
    fontStyle: 'italic'
  },
  eventNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem'
  },
  navButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  eventIndicators: {
    display: 'flex',
    gap: '0.5rem'
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.3)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  activeIndicator: {
    backgroundColor: '#ffd700'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  }
};

export default Anniversary;
