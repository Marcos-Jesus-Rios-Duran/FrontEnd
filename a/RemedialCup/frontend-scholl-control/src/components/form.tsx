import React, { useState } from 'react';
import axios from 'axios';

export const FormStudent: React.FC = () => {
  const [student, setStudent] = useState({
    student_id: '',
    name: '',
    lastname: '',
    grade: '',
    group: '',
    average: 0
  });

  const [error, setError] = useState<string | null>(null); // Estado para mostrar errores

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reseteamos el error en cada envío

    try {
      const response = await axios.post('http://10.10.60.19:3000/api/students/insert', student);

      if (response.data.errors) {
        // Si hay errores, los mostramos
        setError(response.data.errors.join(', '));
      } else {
        // Si la inserción fue exitosa, mostramos el mensaje y reseteamos el formulario
        alert('Student saved: ');
        setStudent({
          student_id: '',
          name: '',
          lastname: '',
          grade: '',
          group: '',
          average: 0
        });
      }
    } catch (err) {
      // Verificamos si el error tiene la propiedad message
      if (err instanceof Error) {
        setError('Error saving student: ID already exists');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <div className="card custom-card">
        <div className="card-header custom-card-header">
          <h3>Registro de Alumnos</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>} {/* Mostramos el mensaje de error si existe */}
          
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="student_id" className="form-label">Matrícula</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="student_id"
                  value={student.student_id}
                  onChange={handleChange}
                  required
                  minLength={1} // Evita que se deje vacío
                  maxLength={20} // Limita el largo, por ejemplo
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="name"
                  value={student.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="lastname" className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="lastname"
                  value={student.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="grade" className="form-label">Grado</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="grade"
                  value={student.grade}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="group" className="form-label">Grupo</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="group"
                  value={student.group}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="average" className="form-label">Promedio</label>
                <input
                  type="number"
                  className="form-control custom-input"
                  id="average"
                  value={student.average}
                  onChange={handleChange}
                  required
                  min={0} // Asegura que el promedio sea al menos 0
                  max={10} // Limita el máximo promedio a 10
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
          background-color:rgba(90, 230, 34, 0.89); /* Verde para el encabezado */
          color: black; /* Color de texto negro */
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
