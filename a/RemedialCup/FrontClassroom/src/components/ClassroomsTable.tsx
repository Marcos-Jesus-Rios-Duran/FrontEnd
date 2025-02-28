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
        <table className="table custom-table">
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
              <tr key={classroom.classroom_id} className="table-row">
                <td>{classroom.classroom_id}</td>
                <td>{classroom.building}</td>
                <td>{classroom.career}</td>
                <td>{classroom.type}</td>
                <td>{classroom.capacity}</td>
                <td colSpan={2}>
                  <button className="btn btn-success btn-sm me-2 custom-btn" onClick={() => handleEdit(classroom)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm custom-btn" onClick={() => deleteClassroom(classroom.classroom_id)}>
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

      <style jsx>{`
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #f8f9fa;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .custom-table th, .custom-table td {
          padding: 12px 15px;
          text-align: center;
        }

        .custom-table th {
          background-color: #007bff;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
        }

        .table-row:hover {
          background-color: #f1f1f1;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .custom-btn {
          border-radius: 50px;
          padding: 8px 16px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .custom-btn:hover {
          transform: scale(1.05);
        }

        .btn-success {
          background-color: #28a745;
          border: none;
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
        }

        .btn-success:hover {
          background-color: #218838;
        }

        .btn-danger:hover {
          background-color: #c82333;
        }

        .table-responsive {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};
