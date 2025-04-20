import React, { useEffect, useState } from 'react'

function Usefetch(url) {
  const [apiData, setApiData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWZiZjlmZGQ2NDE5M2MxODU2MDk1NTc2ODBmODE2MyIsIm5iZiI6MTc0NTE1NjUyNC41NzMsInN1YiI6IjY4MDRmOWFjNDIxYTMwOTc1Y2FhODdjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EAMhTuBjJvv_Dpq_GzHclLIHzU_ZUf5Hz6Mv3MrNkjE'
      }
    };
    fetch(url, {signal: abortCont.signal, options})
      .then((res) => {
        if (!res.ok) {
          throw new Error('could not fetch data')
        }
        return res.json();
      })
      .then((res) => {
        setApiData(res.results);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.error('fetch Aborted')
        } else {
          setError(err.message);
          setIsPending(false);
        }
      })
  }, [url])

  return {
    apiData, isPending, error
  }
}

export default Usefetch