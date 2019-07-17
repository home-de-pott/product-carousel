import React from 'react';

const Stars = ({ rating, numberOfRatings }) => {
  return (
    <div className="carousel__stars-container">
      <span
        className="carousel__empty-stars"
        style={{
          display: 'inline-block',
          position: 'relative',
        }}
      >
        &#9734;&#9734;&#9734;&#9734;&#9734;
        <span
          className="carousel__stars full-stars"
          style={{
            width: (rating / 5) * 100 + '%',
            color: '#f96302',
            position: 'absolute',
            top: '0',
            left: '0',
            overflow: 'hidden',
          }}
        >
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </span>
      </span>
      <span> ({numberOfRatings})</span>
    </div>
  );
};

export default Stars;
