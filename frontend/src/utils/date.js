export function toLocalInputValue(date) {
  const value = date instanceof Date ? date : new Date(date)
  const offset = value.getTimezoneOffset()
  const local = new Date(value.getTime() - offset * 60 * 1000)
  return local.toISOString().slice(0, 16)
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

export function formatHours(value) {
  const num = Number(value) || 0
  if (Number.isInteger(num)) {
    return String(num)
  }
  const fixed = num.toFixed(2)
  return fixed.replace(/\.?0+$/, '')
}
