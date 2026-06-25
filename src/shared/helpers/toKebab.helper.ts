export const toKebab = (str: string) =>
  str
    .replace(/_/g, '-') // convierte snake_case a kebab-case
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // camelCase a kebab-case
    .toLowerCase()
