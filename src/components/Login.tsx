import React, { useState } from 'react'

interface LoginProps {
  onLogin: (user: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [user, setUser] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onLogin(user)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-xl shadow-xl flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter your name"
        className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded focus:border-blue-500 focus:outline-none"
        required
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Log In
      </button>
    </form>
  )
}

export default Login
