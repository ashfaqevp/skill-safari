import React from 'react';

const colors = ['#FFC107', '#9C27B0', '#2196F3', '#4CAF50', '#E91E63'];

const RoundIcon = ({ text , size}) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const initial = text.charAt(0).toUpperCase();

  const styles = {
    backgroundColor: color,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: size,
    height: size
  };

  return <div style={styles}>{initial}</div>;
};

export default RoundIcon;
