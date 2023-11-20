import React from 'react'
import ReservationItem from './ReservationItem'
import { Reservation } from '../types/Reservation'

interface ReservationListProps {
  reservations: Reservation[];
  onUpdate: (id: number, status: Reservation['status']) => void;
  onDelete: (id: number) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, onUpdate, onDelete }) => {
  return (
<div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            reservation={reservation}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
  )
}

export default ReservationList
