import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function converDateToText (date) {
  let counter = 0 
  const text = new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  return text.replace(/ de/g, match => ++counter === 2 ? ', ' : match)
}
