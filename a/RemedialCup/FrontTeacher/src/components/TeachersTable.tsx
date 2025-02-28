import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditTeacherModal } from './EditTeacherModal'; // Import your EditTeacherModal component

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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null); // State to track selected teacher
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch teachers from the API
  const fetchTeachers = () => {
    axios.get('http://10.10.60.28:3000/api/teachers/getAll')
      .then(response => setTeachers(response.data.data)) // Access 'data' from response
      .catch(error => console.error('Error fetching data:', error));
  };

  // Handle the editing of a selected teacher
  const handleEditClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher); // Set the selected teacher for editing
    setShowModal(true); // Show the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedTeacher(null); // Reset the selected teacher
  };

  // Refresh the teacher list after a successful update
  const handleSuccess = () => {
    fetchTeachers(); // Refresh the teacher list after successful update
    handleCloseModal(); // Close the modal
  };

  // Delete a teacher
  const handleDeleteTeacher = (teacher_number: number) => {
    axios.delete(`http://10.10.60.28:3000/api/teachers/deleteOne/${teacher_number}`)
      .then((response) => {
        console.log('Teacher deleted:', response.data);
        fetchTeachers(); // Refresh teacher list after deletion
      })
      .catch((error) => console.error('Error deleting teacher:', error));
  };

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();

    // Polling for new data every 5 seconds
    const intervalId = setInterval(fetchTeachers, 5000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
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
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleEditClick(teacher)} // Open modal with the selected teacher
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTeacher(teacher.teacher_number)} // Handle delete
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render the EditTeacherModal */}
      {showModal && selectedTeacher && (
        <EditTeacherModal
          teacher={selectedTeacher} // Pass selected teacher data
          onClose={handleCloseModal} // Close modal function
          onSuccess={handleSuccess} // Refresh teacher list on success
        />
      )}
    </div>
  );
};
