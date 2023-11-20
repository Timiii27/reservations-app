import React from 'react'

interface AddReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddReservationModal: React.FC<AddReservationModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
    <div className="modal-content bg-gray-800 p-6 w-full max-w-2xl rounded-lg shadow-xl text-white">
      <button onClick={onClose} className="modal-close text-lg">×</button>
      <div className="modal-body text-center">
        {children}
      </div>
    </div>
  </div>
  )
}

export default AddReservationModal
