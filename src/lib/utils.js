import dayjs from 'dayjs'
dayjs.locale('ja')

export const formatDateTime = datetime => {
  const date = dayjs(datetime).format('YYYYMMDD')

  const dateToday = dayjs().format('YYYYMMDD')
  if (date === dateToday) {
    return 'Today at ' + dayjs(datetime).format('h:mm A')
  }

  const dateYesterday = dayjs().add(-1, 'day').format('YYYYMMDD')
  if (date === dateYesterday) {
    return 'Yesterday at ' + dayjs(datetime).format('h:mm A')
  }

  return dayjs(datetime).format('YYYY-MM-DD h:mm A')
}
