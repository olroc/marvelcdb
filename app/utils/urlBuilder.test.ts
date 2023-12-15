import { buildUrl } from './urlBuilder'

describe('urlBuilder', () => {
  describe('buildUrl', () => {
    it('should return a complete URL when baseUrl and hostname are set', () => {
      expect(
        buildUrl({
          baseUrl: 'http://localhost:1234',
          path: '/abc',
        })
      ).toEqual('http://localhost:1234/abc')
    })

    it('should return a local URL in case no baseUrl is given', () => {
      expect(
        buildUrl({
          path: '/abc',
        })
      ).toEqual('/abc')
    })

    it('should handle query parameters correctly', () => {
      expect(
        buildUrl({
          path: '/abc',
          searchParams: new URLSearchParams('?a=1&b=2'),
        })
      ).toEqual('/abc?a=1&b=2')
    })
  })
})
