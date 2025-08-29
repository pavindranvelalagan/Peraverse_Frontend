import React from 'react';
import { Calendar, Users, Award, BookOpen, MapPin, Trophy } from 'lucide-react';
import './UniversityInfo.css';

interface Milestone {
  year: number;
  event: string;
}

interface UniversityData {
  foundedYear?: number;
  currentYear?: number;
  name?: string;
  location?: string;
  studentCount?: string;
  facultyCount?: string;
  departments?: number;
  achievements?: string[];
  description?: string;
  milestones?: Milestone[];
}

interface UniversityInfoProps {
  data?: UniversityData;
  className?: string;
  layout?: 'default' | 'compact' | 'grid';
}

const UniversityInfo: React.FC<UniversityInfoProps> = ({ 
  data = {},
  className = '',
  layout = 'default'
}) => {
  const defaultData: UniversityData = {
    foundedYear: 1950,
    currentYear: new Date().getFullYear(),
    name: 'University of Excellence',
    location: 'Academic City',
    studentCount: '25,000+',
    facultyCount: '1,500+',
    departments: 15,
    achievements: [
      'Top 100 Global University',
      'Excellence in Research',
      'Outstanding Alumni Network',
      'Innovation Hub'
    ],
    description: 'For 75 years, our university has been a beacon of academic excellence, innovation, and social impact. We continue to shape leaders and innovators who make a difference in the world.',
    milestones: [
      { year: 1950, event: 'University Founded' },
      { year: 1975, event: '25th Anniversary - First International Partnership' },
      { year: 2000, event: '50th Anniversary - Digital Campus Launch' },
      { year: 2025, event: '75th Anniversary - Global Excellence Recognition' }
    ]
  };

  const info = { ...defaultData, ...data };
  const yearsOfExcellence = (info.currentYear || 0) - (info.foundedYear || 0);

  const renderStats = () => (
    <div className="university-info-stats-grid">
      <div className="university-info-stat-card">
        <Calendar className="university-info-stat-icon" />
        <div className="university-info-stat-number">{yearsOfExcellence}</div>
        <div className="university-info-stat-label">Years of Excellence</div>
      </div>
      <div className="university-info-stat-card">
        <Users className="university-info-stat-icon" />
        <div className="university-info-stat-number">{info.studentCount}</div>
        <div className="university-info-stat-label">Students</div>
      </div>
      <div className="university-info-stat-card">
        <BookOpen className="university-info-stat-icon" />
        <div className="university-info-stat-number">{info.facultyCount}</div>
        <div className="university-info-stat-label">Faculty Members</div>
      </div>
      <div className="university-info-stat-card">
        <Award className="university-info-stat-icon" />
        <div className="university-info-stat-number">{info.departments}</div>
        <div className="university-info-stat-label">Departments</div>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="university-info-timeline">
      <h3 className="university-info-timeline-title">Our Journey</h3>
      <div className="university-info-timeline-container">
        {info.milestones?.map((milestone, index) => (
          <div key={index} className="university-info-timeline-item">
            <div className="university-info-timeline-year">{milestone.year}</div>
            <div className="university-info-timeline-event">{milestone.event}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="university-info-achievements">
      <h3 className="university-info-achievements-title">Our Achievements</h3>
      <div className="university-info-achievements-list">
        {info.achievements?.map((achievement, index) => (
          <div key={index} className="university-info-achievement-item">
            <Trophy className="university-info-achievement-icon" />
            <span>{achievement}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (layout === 'compact') {
    return (
      <div className={`university-info compact ${className}`}>
        <div className="university-info-compact-header">
          <h2 className="university-info-compact-title">{info.name}</h2>
          <div className="university-info-compact-location">
            <MapPin size={16} />
            <span>{info.location}</span>
          </div>
        </div>
        {renderStats()}
      </div>
    );
  }

  return (
    <div className={`university-info ${className}`}>
      <div className="university-info-header">
        <div className="university-info-header-content">
          <h2 className="university-info-title">About {info.name}</h2>
          <div className="university-info-location">
            <MapPin className="university-info-location-icon" />
            <span>{info.location}</span>
          </div>
        </div>
      </div>

      <div className="university-info-content">
        <div className="university-info-description">
          <p className="university-info-description-text">{info.description}</p>
        </div>

        {renderStats()}
        
        <div className="university-info-grid">
          <div className="university-info-grid-item">
            {renderMilestones()}
          </div>
          <div className="university-info-grid-item">
            {renderAchievements()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;
