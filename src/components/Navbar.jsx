import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-[90%] max-w-4xl mx-auto mt-6 sticky top-6 z-50 bg-white/60 backdrop-blur-xl border border-white/60 p-3 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-row justify-center items-center gap-10'>
        <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors duration-200 ${
                isActive ? "text-black" : "text-gray-500 hover:text-black"
              }`
            }
        >
            Home
        </NavLink>
        
        <NavLink 
            to="/pastes" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors duration-200 ${
                isActive ? "text-black" : "text-gray-500 hover:text-black"
              }`
            }
        >
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar