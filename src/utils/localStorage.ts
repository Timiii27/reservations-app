import { Reservation } from '../types/Reservation'

export const loadReservations = (): Reservation[] => {
  const serializedState = localStorage.getItem('reservations')
  if (serializedState === null) {
    return []
  }
  try {
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Error reading reservations from LocalStorage', err)
    return []
  }
}

export const saveReservations = (reservations: Reservation[]): void => {
  try {
    const serializedState = JSON.stringify(reservations)
    localStorage.setItem('reservations', serializedState)
  } catch (err) {
    console.error('Error saving reservations to LocalStorage', err)
  }
}

export const loadAuthState = (): string | null => {
  try {
    return localStorage.getItem('currentUser')
  } catch (err) {
    console.error('Error loading auth state from LocalStorage', err)
    return null
  }
}

export const saveAuthState = (user: string): void => {
  try {
    localStorage.setItem('currentUser', user)
  } catch (err) {
    console.error('Error saving auth state to LocalStorage', err)
  }
}

export const clearAuthState = (): void => {
  try {
    localStorage.removeItem('currentUser')
  } catch (err) {
    console.error('Error clearing auth state from LocalStorage', err)
  }
}
