export const parseCSSColor = (input: string) => {
  if (input.substr(0, 1) == '#') {
    const collen = (input.length - 1) / 3
    var fact = [17, 1, 0.062272][collen - 1]
    return {
      r: Math.round(parseInt(input.substr(1, collen), 16) * fact),
      g: Math.round(parseInt(input.substr(1 + collen, collen), 16) * fact),
      b: Math.round(parseInt(input.substr(1 + 2 * collen, collen), 16) * fact),
    }
  }
  const components = input
    .split('(')[1]
    .split(')')[0]
    .split(',')
  return {
    r: Number(components[0]),
    g: Number(components[1]),
    b: Number(components[2]),
    a: components.length > 3 ? Number(components[3]) : 1,
  }
}
