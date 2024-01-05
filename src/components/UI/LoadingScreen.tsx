import React from 'react';

import classes from './LoadingScreen.module.scss';

const LoadingScreen: React.FC = () => {
  return (
    <div
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      className="fixed top-0 left-0 w-full h-screen z-10"
    >
      <div
        className={`${classes.loader} absolute w-10 h-10 border-2 border-white_color top-0 bottom-0 right-0 left-0 m-auto z-20`}
      >
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
