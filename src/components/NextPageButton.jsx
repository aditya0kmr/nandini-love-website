import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NextPageButton.css';

const NextPageButton = ({ nextPage, emoji = '💖' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (nextPage) {
      navigate(nextPage);
    }
  };

  return (
    <button className="next-page-btn" onClick={handleClick}>
      <span className="btn-text">Next</span>
      <span className="btn-emoji">{emoji}</span>
      <div className="btn-glow"></div>
    </button>
  );
};

export default NextPageButton;
