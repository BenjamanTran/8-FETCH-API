import Places from './Places.jsx';
import Error from './Error.jsx';
import { useEffect, useState } from 'react';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    async function fetchAvailables() {
      try {
        setIsLoading(true)
        const places = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition(position => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          )
          setAvailablePlaces(sortedPlaces)
        })

        setIsLoading(false)
      } catch (error) {
        setError({ message: error.message || "can't get data in server" })
      }

      setIsLoading(false)
    }



    fetchAvailables()
  }, [])

  if (error) {
    return <Error title='An error occured' message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      loadingText='Many beautifull places is loading'
      places={availablePlaces}
      isLoading={isLoading}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
