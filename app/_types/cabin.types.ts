/** Cabin */
export type TCabin = {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string
  description: string
  totalPrice?: number
}

export type TCabinData = {
  id: number
  name: string
  max_capacity: number
  regular_price: number
  discount: number
  image: string
  description: string
}
