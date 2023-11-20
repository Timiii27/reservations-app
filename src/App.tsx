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
  const [allReservations, setAllReservations] = useState<Reservation[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<Reservation['status'] | 'all'>('all')
  const [editReservation, setEditReservation] = useState<Reservation>()

  useEffect(() => {
    const filteredReservations = allReservations.filter((reservation) => {
      if (filter === 'all') {
        return true
      }
      return reservation.status === filter
    }
    )
    setReservations(filteredReservations)
  }, [filter, allReservations])

  useEffect(() => {
    const loadedReservations = loadReservations()
    if (loadedReservations) {
      setAllReservations(loadedReservations)
    }
  }, [])

  useEffect(() => {
    saveReservations(allReservations)
  }, [allReservations])

  const handleUpdateStatus = (id: number, status: Reservation['status']) => {
    const updatedAllReservations = allReservations.map((reservation) => {
      if (reservation.id === id) {
        return { ...reservation, status }
      }
      return reservation
    })
    setAllReservations(updatedAllReservations)
  }

  const handleDeleteReservation = (id: number) => {
    const updatedAllReservations = allReservations.filter((reservation) => reservation.id !== id)
    setAllReservations(updatedAllReservations)
  }

  useEffect(() => {
    const user = loadAuthState()
    if (user) {
      setUser(user)
    }
  }, [])

  const handleLogin = (userName: string) => {
    setUser(userName)
    saveAuthState(userName)
  }

  const handleLogout = () => {
    setUser(null)
    clearAuthState()
  }
  const handleEditReservation = (reservation: Reservation) => {
    setEditReservation(reservation)
    setIsModalOpen(true)
  }

  const handleAddOrEditReservation = (reservationData: Reservation) => {
    let updatedReservations
    if (editReservation) {
      updatedReservations = allReservations.map((res) =>
        res.id === reservationData.id ? reservationData : res
      )
    } else {
      updatedReservations = [...allReservations, { ...reservationData, id: Date.now() }]
    }
    setAllReservations(updatedReservations)
    setIsModalOpen(false)
    setEditReservation(undefined)
  }
  return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      {user
        ? (
        <>
          <header className="w-full flex justify-between items-center p-4">
            <h1 className="text-3xl">Reservations</h1>
            <div className="flex justify-center gap-4">
              {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
                <button
                  key={status}
                  className={`py-2 px-4 rounded ${filter === status ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
                  onClick={() => setFilter(status as Reservation['status'] | 'all')}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                setIsModalOpen(true)
                setEditReservation(undefined)
              }
              }
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
            <AddReservationForm
              onAdd={handleAddOrEditReservation}
              reservation={editReservation}
            />
          </AddReservationModal>
          <ReservationList
            reservations={reservations}
            onUpdate={handleUpdateStatus}
            onDelete={handleDeleteReservation}
            onEdit={handleEditReservation} // Pass the handleEditReservation function down to ReservationList
          />
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
