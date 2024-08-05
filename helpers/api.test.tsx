import fetchMock from 'fetch-mock'
import { fetchChargers, startChargingSession, stopChargingSession } from './api'

jest.mock('../settings/keys', () => ({
  OpenChargeApiKey: 'test-api-key',
}))

describe('API functions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('fetchChargers', () => {
    it('fetches chargers correctly', async () => {
      const mockResponse = [{ ID: 1, AddressInfo: { Title: 'Charger 1' } }]
      fetchMock.get(
        `https://api.openchargemap.io/v3/poi/?output=json&latitude=1&longitude=2&maxresults=100&compact=true&verbose=false&key=test-api-key`,
        mockResponse
      )

      const chargers = await fetchChargers(1, 2)
      expect(chargers).toEqual(mockResponse)
    })

    it('handles fetch error', async () => {
      fetchMock.get(
        `https://api.openchargemap.io/v3/poi/?output=json&latitude=1&longitude=2&maxresults=100&compact=true&verbose=false&key=test-api-key`,
        { throws: new Error('Network error') }
      )

      const chargers = await fetchChargers(1, 2)
      expect(chargers).toBeNull()
    })
  })

  describe('startChargingSession', () => {
    it('starts charging session correctly', async () => {
      const mockResponse = { success: true }
      fetchMock.post('https://example.ev.energy/startchargingsession', mockResponse)

      const response = await startChargingSession('user1', 'car1', 1)
      expect(response).toEqual(mockResponse)
    })

    it('handles start charging session error', async () => {
      fetchMock.post('https://example.ev.energy/startchargingsession', { throws: new Error('Network error') })

      const response = await startChargingSession('user1', 'car1', 1)
      expect(response).toBeNull()
    })
  })

  describe('stopChargingSession', () => {
    it('stops charging session correctly', async () => {
      const mockResponse = { success: true }
      fetchMock.post('https://example.ev.energy/stopchargingsession', mockResponse)

      const response = await stopChargingSession('user1', 'car1', 1)
      expect(response).toEqual(mockResponse)
    })

    it('handles stop charging session error', async () => {
      fetchMock.post('https://example.ev.energy/stopchargingsession', { throws: new Error('Network error') })

      const response = await stopChargingSession('user1', 'car1', 1)
      expect(response).toBeNull()
    })
  })
})
