import fetch from 'jest-fetch-mock'

import { fetchData } from './fetch'

describe('fetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('fetchData', () => {
    it('should return the fetched data', async () => {
      const mockResponse = { data: 'fake data' }
      fetch.mockResponseOnce(JSON.stringify(mockResponse))

      await expect(fetchData('/a/b/c')).resolves.toEqual(mockResponse)
    })

    it('should throw an error in case of API call failure', async () => {
      const error = new Error('An error occured')
      fetch.mockRejectOnce(error)

      await expect(fetchData('/a/b/c')).rejects.toBe(error)
    })
  })
})
