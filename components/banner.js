import React from 'react';

const Banner = ({ isPublished }) => {
  const bannerStyle = {
    backgroundColor: isPublished ? '#4CAF50' : '#222', // Green for published, Red for not published
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    marginBottom: '20px',
    borderRadius: '4px',
  };

  return (
    <>
      {!isPublished && (
        <div style={bannerStyle}>
          <strong>Warning:</strong> This chapter is not published.
        </div>
      )}
    </>
  );
}

export default Banner;
