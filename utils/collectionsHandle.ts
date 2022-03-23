type URLValues = {
  sort: string
  material: string[]
  room: string[]
  page: number
}

export const buildHandle = (handle: string, values: URLValues) => {
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

  const values: any = {}

  for (let i = 1; i < things.length; i++) {
    const parts = things[i].split('_')
    const key = parts[0]

    let val

    if (key === 'sort') {
      val = parts[1]
    } else if (key === 'page') {
      val = parseInt(parts[1])
    } else {
      val = parts.slice(1)
    }

    values[key] = val
  }

  if (!values.page) {
    values.page = 1
  }

  return { handle, values }
}
