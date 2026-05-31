/**
 * Utility helpers for the project.
 *
 * - `cn()` combines and merges Tailwind class names safely (prevents conflicts)
 * - The type helpers below are optional TypeScript utilities for component props:
 *   they help remove or modify `children`/`child` props and add optional DOM refs.
 *
 * In practice:
 * - `cn()` is actively used everywhere for styling
 * - the type utilities are mostly useful for reusable UI component patterns
 *   (and may not be needed in simpler Svelte apps)
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, 'children'>
  : T

export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null
}
