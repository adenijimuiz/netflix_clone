import React, { useEffect, useState } from 'react'
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate } from 'react-router-dom';

function Player() {
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  })
  const navigate  = useNavigate();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWZiZjlmZGQ2NDE5M2MxODU2MDk1NTc2ODBmODE2MyIsIm5iZiI6MTc0NTE1NjUyNC41NzMsInN1YiI6IjY4MDRmOWFjNDIxYTMwOTc1Y2FhODdjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EAMhTuBjJvv_Dpq_GzHclLIHzU_ZUf5Hz6Mv3MrNkjE'
    }
  };
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/693134/videos?language=en-US', options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={() => navigate('/')} alt="back_arrow" />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0"></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player