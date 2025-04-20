import React from 'react'
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate } from 'react-router-dom';

function Player() {
  const homeNav  = useNavigate();
  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={() => homeNav('/')} alt="back_arrow" />
      <iframe src='https://www.youtube.com/embed/v=02Ijrxhva_g' frameborder="0" title='trailer' allowFullScreen ></iframe>
      <div className="player-info">
        <p>Published Date</p>
        <p>Name</p>
        <p>title</p>
      </div>
    </div>
  )
}

export default Player