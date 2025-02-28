import React from 'react';
import { Navbar } from "./components/navbar";
import { FormClassroom } from './components/formClassroom';
import { ClassroomsTable } from './components/ClassroomsTable';

function App() {
  return (
    <>
      <div className="container"> 
        {/* Aquí va la llamada al componente de la navbar */}
        <div className="row mb-3">
          <Navbar />
        </div>
        {/* Aquí va el contenido principal dividido en dos columnas */}
        <div className="row">
          <div className="col-lg-5">
            <h1>Formulario de registro</h1>
            <FormClassroom />
          </div>
          <div className="col-lg-7">
            <h1>Tabla para mostrar las Aulas</h1>
            {/* Aquí iría el componente para la tabla de profesores */}
            <ClassroomsTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
