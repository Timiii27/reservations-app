import React from 'react'
import { Reservation } from '../types/Reservation'

interface ReservationItemProps {
  reservation: Reservation;
  onUpdate: (id: number, status: Reservation['status']) => void;
  onDelete: (id: number) => void;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation, onUpdate, onDelete }) => {
  const statusOptions: { [key in Reservation['status']]: { bg: string, text: string } } = {
    pending: { bg: 'bg-yellow-400', text: '⏳' },
    confirmed: { bg: 'bg-green-500', text: '✅' },
    cancelled: { bg: 'bg-red-400', text: '❌' },
    completed: { bg: 'bg-blue-500', text: '🏁' }
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-lg font-semibold">{reservation.name} - {reservation.numberOfPeople} people</h3>
      <p className="text-gray-400">{reservation.date} at {reservation.time}</p>
      <div className="flex items-center justify-between">
        {Object.entries(statusOptions).map(([statusKey, { bg, text }]) => (
          <button
            key={statusKey}
            className={`px-4 py-2 ${bg} ${reservation.status === statusKey ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : 'opacity-50'} p-2 rounded-full`}
            onClick={() => onUpdate(reservation.id, statusKey as Reservation['status'])}
          >
            <span className="text-xl">{text}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => onDelete(reservation.id)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  )
}

export default ReservationItem
