import { OpenChargeApiKey } from '../settings/keys'

const addKeyToUrl = (url: string) : string => {
    return url + '&key=' + OpenChargeApiKey
}

export const fetchChargers = async (latitude: number, longitude: number) => {
  try {
    const AuthUrl = addKeyToUrl(`https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&maxresults=100&compact=true&verbose=false`)
    const response = await fetch(AuthUrl)
    return await response.json()
  } catch (error) {
    console.error('Error fetching chargers:', error)
    return null
  }
}

export const startChargingSession = async (user: string, car_id: string, charger_id: number) => {
  try {
    const response = await fetch('https://example.ev.energy/startchargingsession', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        user: user,
        car_id: car_id,
        charger_id: charger_id,
      }),
    })
    return await response.json()
  } catch (error) {
    // commented/replaced because the endpoint doesn't work
    console.log(`Start Charging user: ${user} car: ${car_id} on charger ${charger_id}`)
    // console.error('Error starting charge:', error)
    return null
  }
}

export const stopChargingSession = async (user: string, car_id: string, charger_id: number) => {
  try {
    const response = await fetch('https://example.ev.energy/stopchargingsession', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        user: user,
        car_id: car_id,
        charger_id: charger_id,
      }),
    })
    return await response.json()
  } catch (error) {
    // commented/replaced because the endpoint doesn't work
    console.log(`Stop Charging user: ${user} car: ${car_id} on charger ${charger_id}`)
    // console.error('Error stopping charge:', error)
    return null
  }
}