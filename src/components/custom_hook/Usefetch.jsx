import React, { useEffect, useState } from 'react'

function UseFetch(url, fetchoptions) {
  const [apiData, setApiData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {signal: abortCont.signal, ...fetchoptions})
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
  }, [url, JSON.stringify(fetchoptions)])

  return {
    apiData, isPending, error
  }
}

export default UseFetch