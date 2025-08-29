import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 2rem',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        color: '#333',
        marginBottom: '1rem'
      }}>
        404 - Page Not Found
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#666',
        marginBottom: '2rem'
      }}>
        The page you are looking for does not exist.
      </p>
      <a 
        href="/" 
        style={{ 
          padding: '0.8rem 2rem',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '1rem'
        }}
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
