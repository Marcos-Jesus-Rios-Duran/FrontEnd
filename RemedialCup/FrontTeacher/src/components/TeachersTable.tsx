import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Teacher {
  teacher_number: number;
  name: string;
  lastname: string;
  age: number;
  career: string;
  salary: number;
}

export const TeachersTable: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const fetchTeachers = () => {
    axios.get('http://10.10.60.15:3000/api/teachers/getAll')
      .then(response => setTeachers(response.data.data)) // Accede a la propiedad 'data' de la respuesta
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchTeachers(); // Obtener datos al montar el componente

    // Configurar polling para obtener datos cada 5 segundos
    const intervalId = setInterval(fetchTeachers, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // El arreglo vacío asegura que el efecto solo se ejecute una vez cuando el componente se monte

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-blue-background">
        <thead>
          <tr>
            <th scope="col">Número de Profesor</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">Carrera</th>
            <th scope="col">Salario</th>
            <th scope="col" colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.teacher_number}>
              <td>{teacher.teacher_number}</td>
              <td>{teacher.name}</td>
              <td>{teacher.lastname}</td>
              <td>{teacher.age}</td>
              <td>{teacher.career}</td>
              <td>{teacher.salary}</td>
              <td colSpan={2}>
                <div className="btn-group" role="group">
                  <button className="btn btn-success btn-sm">Editar</button>
                  <button className="btn btn-danger btn-sm">Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
