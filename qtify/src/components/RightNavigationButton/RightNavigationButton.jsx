import React from 'react';
import RightArrowIcon from '../../assets/right-arrow-icon.svg'; // Adjust the path to your SVG

const RightNavigationButton = () => {
  return (
    <div className="right-nav-button">
      <img src={RightArrowIcon} alt="Right Arrow" />
    </div>
  );
};

export default RightNavigationButton;