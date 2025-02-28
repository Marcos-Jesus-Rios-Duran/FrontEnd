import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditClassroomModal } from './EditClassroomModal';

interface Classroom {
  classroom_id: string;
  building: string;
  career: string;
  type: string;
  capacity: number;
}

export const ClassroomsTable: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  const fetchClassrooms = () => {
    axios
      .get('http://10.10.60.28:3000/api/classrooms/getAll')
      .then((response) => setClassrooms(response.data.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const deleteClassroom = (classroom_id: string) => {
    axios
      .delete(`http://10.10.60.28:3000/api/classrooms/deleteOne/${classroom_id}`)
      .then((response) => {
        console.log('Classroom deleted:', response.data);
        fetchClassrooms();
      })
      .catch((error) => console.error('Error deleting classroom:', error));
  };

  const handleEdit = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
  };

  const handleCloseModal = () => {
    setSelectedClassroom(null);
  };

  const handleSuccess = () => {
    setSelectedClassroom(null);
    fetchClassrooms();
  };

  useEffect(() => {
    fetchClassrooms();
    const intervalId = setInterval(fetchClassrooms, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-blue-background">
          <thead>
            <tr>
              <th scope="col">ID del Aula</th>
              <th scope="col">Edificio</th>
              <th scope="col">Carrera</th>
              <th scope="col">Tipo</th>
              <th scope="col">Capacidad</th>
              <th scope="col" colSpan={2}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((classroom) => (
              <tr key={classroom.classroom_id}>
                <td>{classroom.classroom_id}</td>
                <td>{classroom.building}</td>
                <td>{classroom.career}</td>
                <td>{classroom.type}</td>
                <td>{classroom.capacity}</td>
                <td colSpan={2}>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleEdit(classroom)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteClassroom(classroom.classroom_id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedClassroom && (
        <EditClassroomModal classroom={selectedClassroom} onClose={handleCloseModal} onSuccess={handleSuccess} />
      )}
    </>
  );
};
