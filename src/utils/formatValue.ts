function formatValue(value: number | string): string {
  const valueParsed = Number(value)
  const numberFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return numberFormat.format(valueParsed)
}

export default formatValue
