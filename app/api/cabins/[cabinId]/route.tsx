import { getBookedDatesByCabinId } from '@/app/_services/bookings.service'
import { getCabin } from '@/app/_services/cabins.service'
import AppError from '@/app/_utils/AppError.utils'

type TParams = {
  cabinId: string
}

export async function GET(req: Request, { params }: { params: TParams }) {
  const { cabinId } = params

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(parseInt(cabinId)),
      getBookedDatesByCabinId(parseInt(cabinId))
    ])

    if (!cabin) {
      throw new AppError({
        statusCode: 404,
        message: `Cabin with id ${cabinId} not found`
      })
    }

    return Response.json({
      status: 'success',
      data: { cabin, bookedDates }
    })
  } catch (error) {
    if (error instanceof AppError) {
      return Response.json({
        error: error
      })
    } else {
      const err = error as Error
      return Response.json({
        error: new AppError({
          statusCode: 500,
          message: err.message
        })
      })
    }
  }
}
