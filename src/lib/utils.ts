// clsx - Conditionally constructs className strings
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// twMerge - Resolves conflicting Tailwind CSS classes:
// twMerge('px-2 py-1 px-4') 
// Returns: "py-1 px-4" (removes conflicting px-2)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
