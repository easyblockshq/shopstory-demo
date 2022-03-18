const testObject = (obj: any) => {
  return obj.hasOwnProperty('productType')
}
export const encodeCollectionProps = (props: any) => {
  const dictionary: any = {}
  const recur = (input: any) => {
    let obj

    const processObject = (product: any) => {
      if (product.id && testObject(product)) {
        const newId = 'p_' + product.id
        if (!dictionary[newId] || dictionary[newId].relatedProducts.length < product.relatedProducts.length) {
          dictionary[newId] = {
            ...product,
            relatedProducts: [...product.relatedProducts.map((p: any) => ({ id: 'p_' + p.id, relatedProducts: [] }))]
          }
        }
        product = { id: newId, relatedProducts: [...product.relatedProducts] }
      }
      return recur(product)
    }
    if (Array.isArray(input)) {
      obj = [...input]
      obj.forEach((e, i) => {
        obj[i] = processObject(e)
      })
    } else {
      obj = { ...input }
      for (let k in obj) {
        if (!obj.hasOwnProperty(k)) continue
        if (typeof obj[k] === 'object' && obj[k] !== null) {
          obj[k] = processObject(obj[k])
        }
      }
    }
    return obj
  }

  return {
    ...recur(props),
    dictionary
  }
}

export const decodeCollectionProps = (props: any) => {
  const recur = (input: any) => {
    let obj
    let productDepthLevel = 0
    const processObject = (item: any) => {
      if (item.id && item.id.startsWith('p_')) {
        if (props.dictionary[item.id]) {
          item = {
            ...props.dictionary[item.id],
            relatedProducts: item.relatedProducts.length > 0 ? [...item.relatedProducts] : []
          }
        } else {
          throw Error('Not found product with id' + item.id)
        }
      }
      return recur(item)
    }
    if (Array.isArray(input)) {
      obj = [...input]
      obj.forEach((e, i) => {
        if (typeof e === 'object' && e !== null) {
          obj[i] = processObject(e)
        }
      })
    } else {
      obj = { ...input }
      for (let k in obj) {
        if (!obj.hasOwnProperty(k)) continue
        if (typeof obj[k] === 'object' && obj[k] !== null) {
          if (k === 'relatedProducts') productDepthLevel++
          obj[k] = processObject(obj[k])
        }
      }
    }
    return obj
  }
  const newProps = recur(props)
  delete newProps.dictionary
  return newProps
}
