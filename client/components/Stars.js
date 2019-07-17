import React from 'react';

const Stars = ({ rating }) => {
  return (
    <div className="carousel__starsContainer">
      <div
        className="carouselstars"
        style={{
          display: 'inline-block',
          fontFamily: 'Wingdings',
          fontSize: '20px',
          color: '#ccc',
          position: 'relative',
          marginTop: '-15px',
        }}
      >
        <span
          style={{
            width: (rating / 5) * 100 + '%',
            color: '#f96302',
            position: 'absolute',
            top: '0',
            left: '0',
            overflow: 'hidden',
          }}
        ></span>
      </div>
    </div>
  );
};

export default Stars;
