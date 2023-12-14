export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places')
  if (!response.ok) {
    throw new Error('Failed fetch places')
  }
  const resData = await response.json()

  return resData.places
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places: places }), //can sorthand {places}
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await response.json()
  if (!resData.ok) {
    throw new Error('fail to update user data')
  }

  return resData.message
}
