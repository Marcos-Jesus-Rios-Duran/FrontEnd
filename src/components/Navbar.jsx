import React from 'react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-700">Control Escolar</div>
        <div className="flex space-x-4">
          <button className="text-gray-800 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded transition duration-300">
            Alumnos
          </button>
          <button className="text-gray-800 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded transition duration-300">
            Estudiantes
          </button>
          <button className="text-gray-800 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded transition duration-300">
            Maestros
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
    
