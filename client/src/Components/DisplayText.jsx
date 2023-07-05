import React, { useState, useEffect } from 'react';

const DisplayText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length-1) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300); // Adjust the interval duration as per your preference

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <h1>{displayText}</h1>;
};

export default DisplayText;
