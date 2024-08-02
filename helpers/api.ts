import { OpenChargeApiKey } from '../settings/keys'

import { db } from '../data/db'

import { Charger } from '../def/charger'

const addKeyToUrl = (url: string) : string => {
    return url + '&key=' + OpenChargeApiKey
}

export const fetchChargers = async (latitude: number, longitude: number) => {
  try {
    const AuthUrl = addKeyToUrl(`https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&maxresults=100&compact=true&verbose=false`)
    console.log('calling:', AuthUrl)
    const response = await fetch(AuthUrl)
    return await response.json()
  } catch (error) {
    console.error('Error fetching chargers:', error)
    return null
  }
}

export const startChargingSession = async (user: number, car: number, charger: Charger) => {
  try {
    const response = await fetch('https://example.ev.energy/startchargingsession', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        user: user,
        car_id: car,
        charger_id: charger.ID,
      }),
    })
    console.log("charge started")
    return await response.json()
  } catch (error) {
    console.error('Error fetching chargers:', error)
    return null
  }
}

export const stopChargingSession = async (user: number, car: number, charger: Charger) => {
  try {
    const response = await fetch('https://example.ev.energy/stopchargingsession', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        user: user,
        car_id: car,
        charger_id: charger.ID,
      }),
    })
    console.log("charge stopped")
    return await response.json()
  } catch (error) {
    console.error('Error fetching chargers:', error)
    return null
  }
}