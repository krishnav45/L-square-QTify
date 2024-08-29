import React from 'react';
import LeftArrowIcon from '../../assets/left-arrow-icon.svg'; // Adjust the path to your SVG

const LeftNavigationButton = () => {
  return (
    <div className="left-nav-button">
      <img src={LeftArrowIcon} alt="Left Arrow" />
    </div>
  );
};

export default LeftNavigationButton;