import React, { useState } from 'react';
import axios from 'axios';

export const FormTeacher: React.FC = () => {
  const [teacher, setTeacher] = useState({
    teacher_number: 0,
    name: '',
    lastname: '',
    age: 0,
    career: '',
    salary: 0
  });

  const [error, setError] = useState<string | null>(null); // Estado para mostrar errores

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher({ ...teacher, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reseteamos el error en cada envío

    try {
      const response = await axios.post('http://10.10.60.28:3000/api/teachers/insert', teacher);

      if (response.data.errors) {
        // Si hay errores, los mostramos
        setError(response.data.errors.join(', '));
      } else {
        // Si la inserción fue exitosa, mostramos el mensaje y reseteamos el formulario
        alert('Teacher saved: ' + JSON.stringify(response.data.data.teacher));
        setTeacher({
          teacher_number: 0,
          name: '',
          lastname: '',
          age: 0,
          career: '',
          salary: 0
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('Error saving teacher: ' + err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Registro de Profesores</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar el mensaje de error si existe */}
        
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-lg-6">
              <label htmlFor="teacher_number" className="form-label">Número de Profesor</label>
              <input
                type="number"
                className="form-control"
                id="teacher_number"
                value={teacher.teacher_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={teacher.name}
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
                className="form-control"
                id="lastname"
                value={teacher.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="age" className="form-label">Edad</label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={teacher.age}
                onChange={handleChange}
                required
                min={18} // Edad mínima
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
                value={teacher.career}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="salary" className="form-label">Salario</label>
              <input
                type="number"
                className="form-control"
                id="salary"
                value={teacher.salary}
                onChange={handleChange}
                required
                min={0} // Salario mínimo
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
  );
};
