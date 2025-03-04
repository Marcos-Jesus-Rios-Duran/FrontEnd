import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditStudentModal } from './EditStudentModal';

interface Student {
  student_id: number;
  name: string;
  lastname: string;
  grade: number;
  group: string;
  average: number;
}

export const StudentsTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const fetchStudents = () => {
    axios
      .get('http://10.10.60.19:3000/api/students/getAll')
      .then((response) => setStudents(response.data.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const deleteStudent = (student_id: number) => {
    axios
      .delete(`http://10.10.60.19:3000/api/students/deleteOne/${student_id}`)
      .then((response) => {
        console.log('Student deleted:', response.data);
        fetchStudents();
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleSuccess = () => {
    setSelectedStudent(null);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
    const intervalId = setInterval(fetchStudents, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="table custom-table">
          <thead>
            <tr>
              <th scope="col">Matrícula</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Grado</th>
              <th scope="col">Grupo</th>
              <th scope="col">Promedio</th>
              <th scope="col" colSpan={2}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id} className="table-row">
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.lastname}</td>
                <td>{student.grade}</td>
                <td>{student.group}</td>
                <td>{student.average}</td>
                <td colSpan={2}>
                  <button className="btn btn-success btn-sm me-2 custom-btn" onClick={() => handleEdit(student)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm custom-btn" onClick={() => deleteStudent(student.student_id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <EditStudentModal student={selectedStudent} onClose={handleCloseModal} onSuccess={handleSuccess} />
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
