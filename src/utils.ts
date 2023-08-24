const stringifyWithCircular = (
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
): string => {
  const seen = new WeakSet()
  return JSON.stringify(
    value,
    (key, value) => {
      const replacedValue = replacer ? replacer(key, value) : value

      if (typeof replacedValue === 'object' && replacedValue !== null) {
        if (seen.has(replacedValue)) {
          return '[Circular]'
        }
        seen.add(replacedValue)
      }
      return replacedValue
    },
    space
  )
}

const stringify = (
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
): string => {
  try {
    return JSON.stringify(value, replacer, space)
  } catch (error: unknown) {
    return stringifyWithCircular(value, replacer, space)
  }
}

export {stringify}
