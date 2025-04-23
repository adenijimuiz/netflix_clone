import React from 'react'
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';
import Usefetch from '../../components/custom_hook/useFetch';
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Player() {
  const {id} = useParams();
  const navigate  = useNavigate();
  const token = import.meta.env.VITE_TMDB_API_TOKEN;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  const {apiData, isPending, error} = Usefetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);

  const video = apiData?.[0]
  return (
    <>
      <div className='player'>
      <img src={back_arrow_icon} onClick={() => navigate('/')} alt="back_arrow" className='back_arrow'/>

      {isPending && <div>Loading ...</div>}
      {error && <div className='error'><p className="error-message">{error}</p> <img src={netflix_spinner} alt="spinner" className='spinner' /></div>}

      {!isPending && !error && !video && <p>No video found.</p>}

      {video && (<>
      <iframe src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{video.published_at.slice(0, 10)}</p>
        <p>{video.name}</p>
        <p>{video.type}</p>
      </div>
      </>
      )}
    </div>
    </>
  )
}

export default Player