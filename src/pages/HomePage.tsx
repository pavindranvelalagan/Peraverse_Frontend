import React, { useEffect, useState } from 'react';
import VideoHero from '../components/VideoHero';
import UniversityInfo from '../components/UniversityInfo';
import { ChevronDown, Award, Users, BookOpen, Globe, LucideIcon } from 'lucide-react';
import './HomePage.css';

interface UniversityFeature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);

  useEffect(() => {
    setIsLoaded(true);
    
    // Hide scroll hint after user scrolls
    const handleScroll = (): void => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // University data configuration
  const universityData = {
    foundedYear: 1950,
    currentYear: new Date().getFullYear(),
    name: 'University of Peradeniya',
    location: 'Peradeniya, Sri Lanka',
    studentCount: '12,000+',
    facultyCount: '800+',
    departments: 9,
    achievements: [
      'Top University in Sri Lanka',
      'Excellence in Engineering & Science',
      'Outstanding Research Publications',
      'Strong Alumni Network Globally'
    ],
    description: 'The University of Peradeniya stands as the pinnacle of higher education in Sri Lanka. We continue to nurture brilliant minds, conduct groundbreaking research, and contribute to the development of our nation and the world.',
    milestones: [
      { year: 1950, event: 'University of Peradeniya Established' },
      { year: 1965, event: 'First Engineering Faculty Founded' },
      { year: 1980, event: 'Research Excellence Recognition' },
      { year: 2000, event: 'Digital Campus Initiative' },
      { year: 2020, event: 'International Accreditation Achieved' }
    ]
  };

  // University features and highlights
  const universityFeatures: UniversityFeature[] = [
    {
      id: 1,
      icon: Award,
      title: 'Academic Excellence',
      description: 'Recognized as the premier university in Sri Lanka with world-class academic programs and faculty.',
      color: '#3498db'
    },
    {
      id: 2,
      icon: BookOpen,
      title: 'Research Innovation',
      description: 'Leading groundbreaking research across multiple disciplines with state-of-the-art facilities.',
      color: '#e74c3c'
    },
    {
      id: 3,
      icon: Users,
      title: 'Global Community',
      description: 'A diverse community of students, faculty, and alumni making impact worldwide.',
      color: '#f39c12'
    },
    {
      id: 4,
      icon: Globe,
      title: 'International Recognition',
      description: 'Partnerships with leading universities globally and internationally accredited programs.',
      color: '#27ae60'
    }
  ];

  const scrollToNext = (): void => {
    const nextSection = document.getElementById('university-info');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <>
        <div className={`home-page ${isLoaded ? 'loaded' : ''}`}>
          {/* Hero Section with Video */}
          <section className="home-page-hero-section">
            <VideoHero
              videoSrc="/video/video.mp4"
              posterImage="/images/university-campus.jpg"
              title="University of Peradeniya"
              subtitle="Excellence in Education, Research & Innovation"
              autoPlay={true}
              showControls={false}
            />
            {/* Scroll Hint */}
            {showScrollHint && (
              <div className="home-page-scroll-hint bounce-animation" onClick={scrollToNext}>
                <span className="home-page-scroll-text">Explore Our University</span>
                <ChevronDown className="home-page-scroll-icon" />
              </div>
            )}
          </section>
          {/* University Information Section */}
          <section id="university-info" className="home-page-info-section">
            <UniversityInfo 
              data={universityData}
              layout="default"
            />
          </section>
          {/* University Features Section */}
          <section id="features" className="home-page-features-section">
            <div className="home-page-features-container">
              <h2 className="home-page-features-title">Why Choose University of Peradeniya</h2>
              <div className="home-page-features-grid">
                {universityFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={feature.id} className="home-page-feature-card">
                      <div className="home-page-feature-icon" style={{backgroundColor: feature.color}}>
                        <IconComponent size={32} color="white" />
                      </div>
                      <h3 className="home-page-feature-title">{feature.title}</h3>
                      <p className="home-page-feature-description">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </>
  );
};

export default HomePage;
