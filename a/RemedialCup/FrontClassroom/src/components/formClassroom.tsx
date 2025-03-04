import React, { useState } from 'react';
import axios from 'axios';

export const FormClassroom: React.FC = () => {
  const [classroom, setClassroom] = useState({
    classroom_id: '',
    building: '',
    career: '',
    type: '',
    capacity: 0
  });

  const [error, setError] = useState<string | null>(null); // Estado para mostrar errores

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassroom({ ...classroom, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reseteamos el error en cada envío

    try {
      const response = await axios.post('http://10.10.60.19:3000/api/classrooms/insert', classroom);

      if (response.data.errors) {
        // Si hay errores, los mostramos
        setError(response.data.errors.join(', '));
      } else {
        // Si la inserción fue exitosa, mostramos el mensaje y reseteamos el formulario
        alert('Classroom saved: ');
        setClassroom({
          classroom_id: '',
          building: '',
          career: '',
          type: '',
          capacity: 0
        });
      }
    } catch (err) {
      // Verificamos si el error tiene la propiedad message
      if (err instanceof Error) {
        setError('Error saving classroom: ID already exist');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <div className="card custom-card">
        <div className="card-header custom-card-header">
          <h3>Registro de Aulas</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>} {/* Mostramos el mensaje de error si existe */}
          
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="classroom_id" className="form-label">ID del Aula</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="classroom_id"
                  value={classroom.classroom_id}
                  onChange={handleChange}
                  required
                  minLength={1} // Evita que se deje vacío
                  maxLength={20} // Limita el largo, por ejemplo
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="building" className="form-label">Edificio</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="building"
                  value={classroom.building}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="career" className="form-label">Carrera</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="career"
                  value={classroom.career}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="type" className="form-label">Tipo</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="type"
                  value={classroom.type}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="capacity" className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control custom-input"
                  id="capacity"
                  value={classroom.capacity}
                  onChange={handleChange}
                  required
                  min={1} // Asegura que la capacidad sea al menos 1
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary custom-btn">Registrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        /* Estilo para el card (contorno y fondo) */
        .custom-card {
          background-color: #f8f9fa;
          border: 2px solid #007bff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* Estilo para el encabezado (card-header) */
        .custom-card-header {
          background-color:rgba(90, 230, 34, 0.89); /* Azul oscuro para el encabezado */
          color: black; /* Color de texto blanco */
          padding: 10px 20px; /* Espaciado adecuado */
          border-radius: 10px 10px 0 0; /* Bordes redondeados en la parte superior */
        }

        /* Estilo para los inputs */
        .custom-input {
          border-radius: 5px;
          border: 2px solid #007bff;
          transition: all 0.3s ease;
        }

        /* Efecto cuando el input está enfocado */
        .custom-input:focus {
          border-color: #0056b3;
          box-shadow: 0 0 5px rgba(0, 86, 179, 0.6);
        }

        /* Estilo para el botón */
        .custom-btn {
          background-color: #007bff;
          border: 2px solid #007bff;
          color: white;
          font-weight: 600;
          border-radius: 30px;
          padding: 12px 30px;
          font-size: 16px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .custom-btn:hover {
          background-color: #0056b3;
          border-color: #0056b3;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }

        .custom-btn:focus {
          outline: none;
        }

        .custom-btn:active {
          background-color: #004085;
          border-color: #004085;
          box-shadow: none;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};
