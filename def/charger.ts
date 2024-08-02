export interface Charger {
    ID: number
    AddressInfo: {
      Title: string
      AddressLine1: string
      Town: string
      StateOrProvince: string
      Postcode: string
      Country: { description: string }
      Latitude: number
      Longitude: number
      ContactTelephone1: number | string | null,
      ContactTelephone2: number | string | null,
      ContactEmail: string | null,
      Distance: number | null,
      DistanceUnit: number | null
    }
  }