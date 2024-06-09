import {
  differenceInDays,
  formatDistance,
  isAfter,
  isBefore,
  isWithinInterval,
  parseISO
} from 'date-fns'

export const calcNumOfNights = (range: {
  from: Date | undefined
  to: Date | undefined
}) => {
  return range?.from && range?.to
    ? differenceInDays(new Date(range.to), new Date(range.from))
    : 0
}

export const formatDistanceFromNow = (dateStr: string) => {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true
  }).replace('about ', '')
}

export const isAlreadyBooked = ({
  range,
  datesArr
}: {
  range: { from: Date; to: Date }
  datesArr: Date[]
}) => {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: Date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  )
}

export const isFutureDate = (dateString: string) => {
  const dateToCheck = parseISO(dateString)
  const currentDate = new Date()

  return isAfter(dateToCheck, currentDate)
}
