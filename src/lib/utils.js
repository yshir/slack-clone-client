import dayjs from 'dayjs'
dayjs.locale('ja')

export const formatDateTime = datetime => {
  const date = dayjs(datetime).format('YYYYMMDD')
  const time = dayjs(datetime).format('h:mm A')

  const dateToday = dayjs().format('YYYYMMDD')
  if (date === dateToday) {
    return `Today at ${time}`
  }

  const dateYesterday = dayjs().add(-1, 'day').format('YYYYMMDD')
  if (date === dateYesterday) {
    return `Yesterday at ${time}`
  }

  return `${date} ${time}`
}
