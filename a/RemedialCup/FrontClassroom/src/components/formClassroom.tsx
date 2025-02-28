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
      const response = await axios.post('http://10.10.60.28:3000/api/classrooms/insert', classroom);

      if (response.data.errors) {
        // Si hay errores, los mostramos
        setError(response.data.errors.join(', '));
      } else {
        // Si la inserción fue exitosa, mostramos el mensaje y reseteamos el formulario
        alert('Classroom saved: ' + JSON.stringify(response.data.data.classroom));
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
        setError('Error saving classroom: ' + err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                <button type="submit" className="btn btn-primary">Registrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
