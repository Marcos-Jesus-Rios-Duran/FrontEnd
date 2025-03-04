import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Student {
  student_id: string;
  name: string;
  lastname: string;
  grade: string;
  group: string;
  average: number;
}

interface ModalProps {
  student: Student | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditStudentModal: React.FC<ModalProps> = ({ student, onClose, onSuccess }) => {
  const [updatedStudent, setUpdatedStudent] = useState<Student | null>(student);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedStudent) {
      setUpdatedStudent({ ...updatedStudent, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (updatedStudent) {
      try {
        const response = await axios.put(
          `http://10.10.60.19:3000/api/students/updateOne/${updatedStudent.student_id}`,
          updatedStudent
        );

        if (response.data.errors) {
          setError(response.data.errors.join(', '));
        } else {
          onSuccess();
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Error updating student: ' + err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  return (
    <>
      {updatedStudent && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Alumno</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="student_id" className="form-label"><b>Matrícula</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="student_id"
                      value={updatedStudent.student_id}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label"><b>Nombre</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={updatedStudent.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label"><b>Apellido</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      value={updatedStudent.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="grade" className="form-label"><b>Grado</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="grade"
                      value={updatedStudent.grade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="group" className="form-label"><b>Grupo</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="group"
                      value={updatedStudent.group}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="average" className="form-label"><b>Promedio</b></label>
                    <input
                      type="number"
                      className="form-control"
                      id="average"
                      value={updatedStudent.average}
                      onChange={handleChange}
                      required
                      min={0}
                      max={10}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mx-2">Actualizar</button>
                    <button type="button" className="btn btn-secondary mx-2" onClick={onClose}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
