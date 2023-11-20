import React, { useEffect, useState } from 'react'
import { Reservation } from '../types/Reservation'

interface AddReservationFormProps {
  onAdd: (reservation: Reservation) => void;
  reservation?: Reservation;
}

const AddReservationForm: React.FC<AddReservationFormProps> = ({ onAdd, reservation }) => {
  const [formState, setFormState] = useState({
    name: '',
    numberOfPeople: '',
    date: '',
    time: ''
  })

  useEffect(() => {
    if (reservation) {
      setFormState({
        name: reservation.name,
        numberOfPeople: reservation.numberOfPeople.toString(),
        date: reservation.date,
        time: reservation.time
      })
    }
  }, [reservation])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReservation: Reservation = {
      ...formState,
      numberOfPeople: parseInt(formState.numberOfPeople),
      id: reservation ? reservation.id : Date.now(),
      status: reservation ? reservation.status : 'pending'
    }

    onAdd(newReservation)

    if (!reservation) {
      setFormState({
        name: '',
        numberOfPeople: '',
        date: '',
        time: ''
      })
    }
  }

  return (
    <div className="container mx-auto text-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
        <input
          type="text"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          placeholder="Customer's Name"
          required
        />
        <input
          type="number"
          value={formState.numberOfPeople}
          onChange={(e) => setFormState({ ...formState, numberOfPeople: e.target.value })}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          placeholder="Number of People"
          required
          min="1"
        />
        <input
          type="date"
          value={formState.date}
          onChange={(e) => setFormState({ ...formState, date: e.target.value })}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="time"
          value={formState.time}
          onChange={(e) => setFormState({ ...formState, time: e.target.value })}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {reservation ? 'Edit Reservation' : 'Add Reservation'}
        </button>
      </form>
    </div>
  )
}

export default AddReservationForm
