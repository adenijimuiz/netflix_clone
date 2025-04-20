import React, { useEffect, useRef, useState } from 'react'
import './titlecards.css'
// import Usefetch from '../custom_hook/Usefetch';
// import netflix_spinner from '../../assets/netflix_spinner.gif'
// import cards_data from '../../assets/cards/Cards_data'

function TitleCards({title, category}) {
  const [apiData, setApiData] = useState([])
  // const {apiData, isPending, error} = Usefetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`);
  // Create a reference to the scrollable container DOM element
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWZiZjlmZGQ2NDE5M2MxODU2MDk1NTc2ODBmODE2MyIsIm5iZiI6MTc0NTE1NjUyNC41NzMsInN1YiI6IjY4MDRmOWFjNDIxYTMwOTc1Y2FhODdjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EAMhTuBjJvv_Dpq_GzHclLIHzU_ZUf5Hz6Mv3MrNkjE'
    }
  };

  // Handle the wheel event to scroll horizontally when the user scrolls vertically
  const handleWheel = (event) => {
    event.preventDefault(); // Prevent the default vertical scroll behavior
    cardsRef.current.scrollLeft += event.deltaY; // Scroll horizontally instead
  };

  useEffect(() => {
    console.log("TitleCards useEffect is running!");
    // Get the current DOM element from the ref
    const cardsEl = cardsRef.current;

    // If the element exists, add the wheel event listener
    if (cardsEl) {
      // Add the custom wheel handler with passive: false so we can use preventDefault
      cardsEl.addEventListener('wheel', handleWheel, { passive: false });
    }
    const abortCont = new AbortController();
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options, )
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error('error',err));
  }, [category]);

  return (
    <>
    {/* {isPending && <div>Loading ...</div>}
    {error && <div>{error} <img src={netflix_spinner} alt="spinner" /></div>} */}

   <div className='titleCards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="image" />
            <p>{card.original_title
            }</p>
          </div>
        })}
      </div>
    </div>
    </>
  )
}

export default TitleCards