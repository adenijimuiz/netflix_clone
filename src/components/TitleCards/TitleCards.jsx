import React, { useEffect, useRef} from 'react'
import './titlecards.css'
import UseFetch from '../custom_hook/useFetch';
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { Link } from 'react-router-dom';
// import cards_data from '../../assets/cards/Cards_data'

function TitleCards({title, category}) {
  const token = import.meta.env.VITE_TMDB_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  const {apiData, isPending, error} = UseFetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options);
  // Create a reference to the scrollable container DOM element
  const cardsRef = useRef();


  // Handle the wheel event to scroll horizontally when the user scrolls vertically
  const handleWheel = (event) => {
    event.preventDefault(); // Prevent the default vertical scroll behavior
    cardsRef.current.scrollLeft += event.deltaY; // Scroll horizontally instead
  };

  useEffect(() => {
    // Get the current DOM element from the ref
    const cardsEl = cardsRef.current;

    // If the element exists, add the wheel event listener
    if (cardsEl) {
      // Add the custom wheel handler with passive: false so we can use preventDefault
      cardsEl.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (cardsEl) {
        cardsEl.removeEventListener('wheel', handleWheel);
      }
    };

  }, []);

  return (
    <>
    {isPending && <div>Loading ...</div>}
    {error && <div>{error} <img src={netflix_spinner} alt="spinner" /></div>}

    {apiData && <div className='titleCards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`}  className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="image" />
            <p>{card.original_title
            }</p>
          </Link>
        })}
      </div>
      
    </div>}
    </>
  )
}

export default TitleCards