import React, { useState, useEffect } from 'react'
import AddReservationForm from './components/AddReservationForm'
import ReservationList from './components/ReservationList'
import { clearAuthState, loadAuthState, loadReservations, saveAuthState, saveReservations } from './utils/localStorage'
import { Reservation } from './types/Reservation'
import Login from './components/Login'
import AddReservationModal from './components/AddReservationModal'

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    const loadedReservations = loadReservations()
    if (loadedReservations) {
      setReservations(loadedReservations)
    }
  }, [])

  useEffect(() => {
    saveReservations(reservations)
  }, [reservations])

  const handleAddReservation = (newReservation: Reservation) => {
    setReservations([...reservations, newReservation])
  }

  const handleUpdateStatus = (id: number, status: string) => {
    const validStatuses: Reservation['status'][] = ['pending', 'confirmed', 'cancelled', 'completed']
    if (!validStatuses.includes(status as Reservation['status'])) {
      throw new Error(`Invalid status: ${status}`)
    }
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === id) {
        return { ...reservation, status: status as Reservation['status'] }
      }
      return reservation
    })
    setReservations(updatedReservations)
  }

  const handleDeleteReservation = (id: number) => {
    const updatedReservations = reservations.filter((reservation) => reservation.id !== id)
    setReservations(updatedReservations)
  }

  useEffect(() => {
    const user = loadAuthState()
    if (user) {
      setUser(user)
    }
  }, [])

  // Y cuando el usuario se "loguea"
  const handleLogin = (userName: string) => {
    setUser(userName)
    saveAuthState(userName)
  }

  const handleLogout = () => {
    setUser(null)
    clearAuthState()
  }

  return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      {user
        ? (
        <>
          <header className="w-full flex justify-between items-center p-4">
            <h1 className="text-3xl">Reservations</h1>
            <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Reservation
            </button>
              <p className="text-lg border-2 border-gray-600 px-2 py-1 rounded-lg">Welcome, {user}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Log Out
              </button>
            </div>
          </header>
          <main className="w-full flex flex-col items-center flex-grow p-4">
            <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <AddReservationForm onAdd={handleAddReservation} />
            </AddReservationModal>
            <ReservationList reservations={reservations} onUpdate={handleUpdateStatus} onDelete={handleDeleteReservation} />
          </main>
        </>
          )
        : (
        <Login onLogin={handleLogin} />
          )}
    </div>
  )
}

export default App
