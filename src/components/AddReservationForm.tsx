import React, { useState } from 'react'
import { Reservation } from '../types/Reservation'

interface AddReservationFormProps {
  onAdd: (reservation: Reservation) => void;
}

const AddReservationForm: React.FC<AddReservationFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      id: Date.now(),
      name,
      numberOfPeople: parseInt(numberOfPeople, 10),
      date,
      time,
      status: 'pending'
    })

    // Reset form
    setName('')
    setNumberOfPeople('')
    setDate('')
    setTime('')
  }

  return (
    <div className="container mx-auto text-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          placeholder="Customer's Name"
          required
        />
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          placeholder="Number of People"
          required
          min="1"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Reservation
        </button>
      </form>
    </div>
  )
}

export default AddReservationForm
