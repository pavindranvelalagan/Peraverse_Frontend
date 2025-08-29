import React, { useState, useEffect } from 'react';
import HeatMapView from '../components/HeatMap';
import { Users, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { getEventStatusColor, getAlertTypeColor } from '../utils/colors';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    events: {
      today: [],
      upcoming: []
    },
    crowd: {
      statistics: {},
      criticalZones: []
    },
    alerts: {
      recent: [],
      statistics: {}
    },
    loading: true,
    error: null
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for frontend-only version
  const mockData = {
    events: {
      today: [
        {
          id: 1,
          title: "AI & Machine Learning Workshop",
          startTime: "09:00",
          endTime: "12:00",
          status: "confirmed",
          attendees: 150
        },
        {
          id: 2,
          title: "Robotics Exhibition",
          startTime: "14:00",
          endTime: "17:00",
          status: "confirmed",
          attendees: 250
        }
      ],
      upcoming: [
        {
          id: 3,
          title: "Space Technology Symposium",
          startTime: "10:00",
          endTime: "15:00",
          status: "confirmed",
          attendees: 300
        }
      ],
      statistics: {
        activeEvents: 3,
        totalEvents: 15,
        completedEvents: 8
      }
    },
    crowd: {
      statistics: {
        totalOccupancy: 2847,
        averageUsage: 78,
        maxCapacity: 3500
      },
      criticalZones: []
    },
    alerts: {
      recent: [
        {
          id: 1,
          message: "High crowd density in Exhibition Hall A",
          type: "warning",
          timeAgo: "5 minutes ago"
        },
        {
          id: 2,
          message: "Temperature control system optimal",
          type: "info",
          timeAgo: "15 minutes ago"
        }
      ],
      statistics: {
        unacknowledged: 2,
        total: 8
      }
    }
  };

  useEffect(() => {
    loadDashboardData();
    
    // Set up periodic refresh
    const interval = setInterval(() => {
      loadDashboardData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simulate API loading delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setDashboardData({
        ...mockData,
        loading: false,
        error: null
      });

      setLastUpdated(new Date());
    } catch (error) {
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  const getStatsData = () => {
    const { events, crowd, alerts } = dashboardData;
    
    return [
      {
        title: 'Total Attendees',
        value: crowd.statistics.totalOccupancy?.toLocaleString() || '0',
        change: '+12%',
        changeType: 'positive',
        icon: Users,
        color: '#3b82f6'
      },
      {
        title: 'Active Events',
        value: events.statistics?.activeEvents?.toString() || '0',
        change: '+2',
        changeType: 'positive',
        icon: Clock,
        color: '#10b981'
      },
      {
        title: 'Capacity Usage',
        value: `${crowd.statistics.averageUsage || 0}%`,
        change: '-5%',
        changeType: 'negative',
        icon: TrendingUp,
        color: '#f59e0b'
      },
      {
        title: 'Alerts',
        value: alerts.statistics?.unacknowledged?.toString() || '0',
        change: '+1',
        changeType: 'warning',
        icon: AlertTriangle,
        color: '#ef4444'
      }
    ];
  };

  if (dashboardData.loading) {
    return (
      <div className="container" style={{ paddingTop: '2rem', textAlign: 'center' }}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  if (dashboardData.error) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{ 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '8px', 
          padding: '1rem',
          color: '#dc2626'
        }}>
          Error loading dashboard: {dashboardData.error}
        </div>
      </div>
    );
  }

  const stats = getStatsData();

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', position: 'relative' }}>
      {/* Top left corner Last Updated */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
       {/*  <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
         */}
      </div>
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="text-3xl mb-4" style={{ textAlign: 'center' }}>Welcome to the largest Scientific Exhibition of the Year!</h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem', textAlign: 'center' }}>
          Make your Experience smooth and Enjoyable with our advanced crowd management and event scheduling platform.
        </p>
      </div>

      {/* Heat Map Section */}
      <HeatMapView />

      {/* Stats Grid */}
      <div className="grid grid-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="card" style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: `${stat.color}20`,
                  color: stat.color
                }}>
                  <IconComponent size={24} />
                </div>
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stat.value}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{stat.title}</p>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: stat.changeType === 'positive' ? '#10b981' : 
                       stat.changeType === 'negative' ? '#ef4444' : '#f59e0b'
              }}>
                {stat.change}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-2">
        {/* Recent Events */}
        <div className="card">
          <h2 className="text-2xl mb-4">Today's Events</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dashboardData.events.today.length > 0 ? (
              dashboardData.events.today.map((event) => (
                <div key={event.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{event.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
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
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {event.attendees} attendees
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                No events scheduled for today
              </p>
            )}
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <h2 className="text-2xl mb-4">Recent Alerts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dashboardData.alerts.recent.length > 0 ? (
              dashboardData.alerts.recent.map((alert) => (
                <div key={alert.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: alert.type === 'error' ? '#fef2f2' : 
                                  alert.type === 'warning' ? '#fffbeb' : '#f0f9ff',
                  borderRadius: '8px',
                  border: `1px solid ${alert.type === 'error' ? '#fecaca' : 
                                      alert.type === 'warning' ? '#fed7aa' : '#bae6fd'}`
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getAlertTypeColor(alert.type),
                    marginTop: '0.375rem',
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{alert.message}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>{alert.timeAgo}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                No recent alerts
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
