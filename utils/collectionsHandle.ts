import { URLValues } from '../types'

export const buildHandle = (handle: string | null, values: URLValues | null) => {
  if (!handle || !values) {
    return null
  }

  let ret = handle

  if (values.sort) {
    ret += `__sort_${values.sort}`
  }
  if (Array.isArray(values.material) && values.material.length > 0) {
    ret += '__material'

    values.material.forEach((c: string) => {
      ret += `_${c}`
    })
  }
  if (Array.isArray(values.room) && values.room.length > 0) {
    ret += '__room'

    values.room.forEach((c: string) => {
      ret += `_${c}`
    })
  }
  if (values.page && values.page > 1) {
    ret += `__page_${values.page}`
  }

  return ret
}

export const decomposeHandle = (fullHandle: string) => {
  const things = fullHandle.split('__')

  let handle = things[0]

  const values = things.reduce<URLValues>((acc, thing) => {
    const parts = thing.split('_')
    const key = parts[0]

    if (key === 'sort') {
      return {
        ...acc,
        [key]: parts[1]
      }
    }

    if (key === 'page') {
      return {
        ...acc,
        [key]: parseInt(parts[1])
      }
    }

    if (key === 'room' || key === 'material') {
      return {
        ...acc,
        [key]: parts.slice(1)
      }
    }

    return acc
  }, <URLValues>{})

  if (!values.page) {
    values.page = 1
  }

  return { handle, values }
}
