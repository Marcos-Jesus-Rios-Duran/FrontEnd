import React from 'react';
import { Navbar } from "./components/navbar";
import { Form } from "./components/form"; // Asegúrate de importar el componente Form
import { StudentTable } from './components/StudentTable';

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
            <Form />
          </div>
          <div className="col-lg-7">
            <h1>Tabla para mostrar los estudiantes</h1>
            {/* Aquí iría el componente para la tabla de estudiantes */}
            <StudentTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
