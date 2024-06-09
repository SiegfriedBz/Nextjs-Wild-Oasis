import supabase from '@/app/_lib/supabase'

import type { TCabin, TCabinData } from '@/app/_types/cabin.types'
import AppError from '@/app/_utils/AppError.utils'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

/** GET */
export async function getCabin(id: number) {
  const { data, error }: PostgrestSingleResponse<TCabinData> = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
  }

  if (!data) return null

  const cabin = formatServerCabinData(data)

  return cabin as TCabin
}

export async function getCabinPrice(id: number) {
  const {
    data,
    error
  }: PostgrestSingleResponse<{
    regular_price: TCabinData['regular_price']
    discount: TCabinData['discount']
  }> = await supabase
    .from('cabins')
    .select('regular_price, discount')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
  }

  if (!data) return

  const cabinPrice = {
    ...data,
    regularPrice: data.regular_price
  }

  return cabinPrice
}

export const getCabins = async function (): Promise<TCabin[]> {
  const { data, error }: PostgrestSingleResponse<TCabinData[]> = await supabase
    .from('cabins')
    .select(
      'id, name, max_capacity, regular_price, discount, image, description'
    )
    .order('name')

  if (error) {
    console.error(error)
    throw new AppError({
      statusCode: 500,
      message: 'Cabins could not be loaded'
    })
  }

  const cabins = data.map((cabinData) => {
    return formatServerCabinData(cabinData)
  })

  return cabins as TCabin[]
}

// Helper
const formatServerCabinData = (cabinData: TCabinData) => {
  const cabin = {
    id: cabinData.id,
    name: cabinData.name,
    maxCapacity: cabinData.max_capacity,
    regularPrice: cabinData.regular_price,
    discount: cabinData.discount,
    image: cabinData.image,
    description: cabinData.description
  }

  return cabin as TCabin
}
