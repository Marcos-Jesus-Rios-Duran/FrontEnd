import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditTeacherModal } from './EditTeacherModal';

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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const fetchTeachers = () => {
    axios.get('http://10.10.60.15:3000/api/teachers/getAll')
      .then(response => setTeachers(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const deleteTeacher = (teacher_number: number) => {
    axios.delete(`http://10.10.60.15:3000/api/teachers/deleteOne/${teacher_number}`)
      .then(response => {
        console.log('Teacher deleted:', response.data);
        fetchTeachers();
      })
      .catch(error => console.error('Error deleting teacher:', error));
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
  };

  const handleSuccess = () => {
    setSelectedTeacher(null);
    fetchTeachers();
  };

  useEffect(() => {
    fetchTeachers();

    const intervalId = setInterval(fetchTeachers, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
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
                  <button 
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleEdit(teacher)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteTeacher(teacher.teacher_number)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTeacher && (
        <EditTeacherModal 
          teacher={selectedTeacher} 
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};
