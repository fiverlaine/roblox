export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatRobux(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateRandomCents(base: number): number {
  const cents = Math.floor(Math.random() * 99) + 1
  return base + cents / 100
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`
  }
  return cpf
}

export function generateStartParam(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generateFakeCardNumber(): string {
  const prefixes = ['4', '5', '6']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  let num = prefix
  for (let i = 0; i < 15; i++) {
    num += Math.floor(Math.random() * 10).toString()
  }
  return num.replace(/(.{4})/g, '$1 ').trim()
}

export function generateFakeCVV(): string {
  return Math.floor(100 + Math.random() * 900).toString()
}

export function generateFakeExpiry(): string {
  const month = Math.floor(Math.random() * 12) + 1
  const year = 26 + Math.floor(Math.random() * 4)
  return `${month.toString().padStart(2, '0')}/${year}`
}
