import React, { useEffect, useRef } from 'react'
import './titlecards.css'
import cards_data from '../../assets/cards/Cards_data'

function TitleCards({title, category}) {
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

  // Cleanup function to remove the event listener when the component unmounts
  return () => {
    if (cardsEl) {
      cardsEl.removeEventListener('wheel', handleWheel);
    }
  };
}, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className='titleCards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => {
          return <div className="card" key={index}>
            <img src={card.image} alt="image" />
            <p>{card.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards