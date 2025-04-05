import React from 'react';
import './loader.scss';

const Loader = () => {
  return (
    <div className="loading-container">
      <svg className="loading-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="hammer">
          <rect x="45" y="15" width="10" height="40" fill="#777" />
          <rect x="42" y="53" width="15" height="5" fill="#555" />
          <circle cx="50" cy="10" r="5" fill="#555" />
        </g>
        <g className="screwdriver">
          <rect x="30" y="55" width="10" height="40" fill="#666" />
          <rect x="29" y="95" width="13" height="5" fill="#444" />
        </g>
      </svg>
    </div>
  );
};

export default Loader;
