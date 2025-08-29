import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Calendar, Info, LucideIcon } from 'lucide-react';
import './Navbar.css';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Users },
    { path: '/crowd-management', label: 'Crowd Management', icon: Users },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/information', label: 'Information', icon: Info },
  ];

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link 
          to="/" 
          className="navbar-brand-link"
        >
          <img 
            src="/images/Eng.png" 
            alt="EngEx 2025" 
            className="navbar-logo" 
          />
          EngEx 2025
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-desktop-menu">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-nav-link ${isActive ? 'active' : ''}`}
            >
              <IconComponent size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="mobile-menu-btn"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
