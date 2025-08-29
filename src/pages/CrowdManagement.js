import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, Activity } from 'lucide-react';
import { getCrowdStatusColor } from '../utils/colors';
import { LoadingView, ErrorView, getPercentage } from '../utils/uiHelpers';
import { getEmergencyActionIcon } from '../utils/iconHelpers';

const CrowdManagement = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zones, setZones] = useState([]);
  const [crowdStats, setCrowdStats] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for frontend-only version
  const mockZones = [
    { id: 1, name: "Exhibition Hall A", current: 180, capacity: 250, status: "warning", coordinates: { x: 25, y: 30 } },
    { id: 2, name: "Exhibition Hall B", current: 120, capacity: 200, status: "normal", coordinates: { x: 75, y: 30 } },
    { id: 3, name: "Main Auditorium", current: 450, capacity: 500, status: "warning", coordinates: { x: 50, y: 60 } },
    { id: 4, name: "Food Court", current: 95, capacity: 150, status: "normal", coordinates: { x: 25, y: 80 } },
    { id: 5, name: "Lobby Area", current: 80, capacity: 100, status: "warning", coordinates: { x: 75, y: 80 } }
  ];

  const mockStats = {
    totalOccupancy: 925,
    averageCapacity: 74,
    safetyCompliance: 95
  };

  const mockAlerts = [
    { message: "High crowd density in Exhibition Hall A", severity: "warning", timestamp: new Date(Date.now() - 300000) },
    { message: "Main Auditorium approaching capacity", severity: "warning", timestamp: new Date(Date.now() - 600000) }
  ];

  const mockEmergencyActions = [
    { id: 1, action: "Crowd Redirection", description: "Redirect traffic from overcrowded areas" },
    { id: 2, action: "Emergency Announcement", description: "Make public announcements" },
    { id: 3, action: "Additional Staff", description: "Deploy additional crowd control staff" },
    { id: 4, action: "Area Restriction", description: "Temporarily restrict access to specific areas" }
  ];

  useEffect(() => {
    loadCrowdData();
    
    // Set up periodic refresh for real-time updates
    const interval = setInterval(loadCrowdData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadCrowdData = () => {
    try {
      // Simulate loading delay
      setLoading(true);
      setTimeout(() => {
        setZones(mockZones);
        setCrowdStats(mockStats);
        setAlerts(mockAlerts);
        setError(null);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Error loading crowd management data');
      console.error('Crowd data loading error:', err);
      setLoading(false);
    }
  };

  const handleEmergencyAction = (actionId) => {
    // Simulate emergency action execution
    console.log(`Executing emergency action: ${actionId}`);
    // In a real app, this would trigger backend actions
  };

  const handleZoneUpdate = (zoneId, newCount) => {
    // Simulate zone update
    console.log(`Updating zone ${zoneId} count to ${newCount}`);
    // In a real app, this would update backend data
  };

  const getEmergencyActions = () => {
    return mockEmergencyActions;
  };

  if (loading) return <LoadingView message="Loading crowd management data..." />;
  if (error) return <ErrorView error={error} onRetry={loadCrowdData} />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="text-3xl mb-4" style={{ textAlign: 'center' }}>Crowd Management</h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem', textAlign: 'center' }}>
          Choose your next destination based on our real time crowd density data and alerts.
        </p>
      </div>

      <div className="grid grid-2">
        {/* Interactive Venue Map */}
        <div className="card">
          <h2 className="text-2xl mb-4">Venue Layout & Density</h2>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            {/* Venue Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
                linear-gradient(#e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
            
            {/* Zone Markers */}
            {zones.map((zone) => (
              <div
                key={zone.id}
                style={{
                  position: 'absolute',
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedZone(zone)}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: getCrowdStatusColor(zone.status),
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={12} color="white" />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  marginTop: '4px',
                  opacity: selectedZone?.id === zone.id ? 1 : 0,
                  transition: 'opacity 0.2s'
                }}>
                  {zone.name}
                </div>
              </div>
            ))}
          </div>
          
          {selectedZone && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{selectedZone.name}</h3>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Current: </span>
                  <span style={{ fontWeight: '600' }}>{selectedZone.current}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Capacity: </span>
                  <span style={{ fontWeight: '600' }}>{selectedZone.capacity}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Usage: </span>
                  <span style={{ 
                    fontWeight: '600',
                    color: getCrowdStatusColor(selectedZone.status)
                  }}>
                    {getPercentage(selectedZone.current, selectedZone.capacity)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zone Status List */}
        <div className="card">
          <h2 className="text-2xl mb-4">Zone Status Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {zones.map((zone) => (
              <div key={zone.id} style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setSelectedZone(zone)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{zone.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {zone.current} / {zone.capacity} people
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: zone.status === 'normal' ? '#dcfce7' : 
                                     zone.status === 'warning' ? '#fef3c7' : '#fecaca',
                      color: zone.status === 'normal' ? '#166534' : 
                             zone.status === 'warning' ? '#92400e' : '#991b1b'
                    }}>
                      {getPercentage(zone.current, zone.capacity)}%
                    </div>
                    <div style={{
                      width: '80px',
                      height: '4px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '2px',
                      marginTop: '0.5rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${getPercentage(zone.current, zone.capacity)}%`,
                        height: '100%',
                        backgroundColor: getCrowdStatusColor(zone.status),
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="card">
        <h2 className="text-2xl mb-4">Emergency Actions</h2>
        <div className="grid grid-2">
          {getEmergencyActions().map((action) => {
            const IconComponent = getEmergencyActionIcon(action.id);
            return (
              <button 
                key={action.id} 
                onClick={() => handleEmergencyAction(action.id)}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#dbeafe',
                    color: '#3b82f6'
                  }}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{action.action}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-3">
        <div className="card text-center">
          <div style={{ 
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#dbeafe',
            color: '#3b82f6',
            width: 'fit-content',
            margin: '0 auto 1rem'
          }}>
            <Users size={32} />
          </div>
          <h3 className="text-2xl mb-2">{crowdStats.totalOccupancy || 0}</h3>
          <p style={{ color: '#6b7280' }}>Total Current Occupancy</p>
        </div>
        
        <div className="card text-center">
          <div style={{ 
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#fef3c7',
            color: '#f59e0b',
            width: 'fit-content',
            margin: '0 auto 1rem'
          }}>
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-2xl mb-2">{crowdStats.averageCapacity || 0}%</h3>
          <p style={{ color: '#6b7280' }}>Average Capacity Usage</p>
        </div>
        
        <div className="card text-center">
          <div style={{ 
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#dcfce7',
            color: '#10b981',
            width: 'fit-content',
            margin: '0 auto 1rem'
          }}>
            <Activity size={32} />
          </div>
          <h3 className="text-2xl mb-2">{crowdStats.safetyCompliance || 0}%</h3>
          <p style={{ color: '#6b7280' }}>Safety Compliance</p>
        </div>
      </div>

      {/* Recent Alerts */}
      {alerts.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 className="text-2xl mb-4">Recent Crowd Alerts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {alerts.slice(0, 5).map((alert, index) => (
              <div key={index} style={{
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: alert.severity === 'critical' ? '#fef2f2' : '#fff7ed',
                border: `1px solid ${alert.severity === 'critical' ? '#fecaca' : '#fed7aa'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle 
                    size={16} 
                    color={alert.severity === 'critical' ? '#ef4444' : '#f59e0b'} 
                  />
                  <span style={{ fontWeight: '500' }}>{alert.message}</span>
                  <span style={{ 
                    marginLeft: 'auto', 
                    fontSize: '0.875rem', 
                    color: '#6b7280' 
                  }}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdManagement;
