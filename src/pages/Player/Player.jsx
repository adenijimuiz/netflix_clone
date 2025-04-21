import React from 'react'
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate } from 'react-router-dom';
import Usefetch from '../../components/custom_hook/useFetch';
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Player() {
  // const [apiData, setApiData] = useState({
  //   name: '',
  //   key: '',
  //   published_at: '',
  //   type: ''
  // })
  const navigate  = useNavigate();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWZiZjlmZGQ2NDE5M2MxODU2MDk1NTc2ODBmODE2MyIsIm5iZiI6MTc0NTE1NjUyNC41NzMsInN1YiI6IjY4MDRmOWFjNDIxYTMwOTc1Y2FhODdjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EAMhTuBjJvv_Dpq_GzHclLIHzU_ZUf5Hz6Mv3MrNkjE'
    }
  };
  const {apiData, isPending, error} = Usefetch('https://api.themoviedb.org/3/movie/550/videos?language=en-US', options);

  const video = apiData?.[0]

  return (
    <>
      <div className='player'>
      <img src={back_arrow_icon} onClick={() => navigate('/')} alt="back_arrow" />

      {isPending && <div>Loading ...</div>}
      {error && <div>{error} <img src={netflix_spinner} alt="spinner" /></div>}

      {!isPending && !error && !video && <p>No video found.</p>}

      {video && (<>
      <iframe src={`https://www.youtube.com/embed/${video.key}`} frameborder="0"></iframe>
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