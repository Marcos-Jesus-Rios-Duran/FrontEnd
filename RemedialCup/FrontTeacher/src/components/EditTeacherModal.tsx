import React, { useState } from 'react';
import axios from 'axios';

interface Teacher {
  teacher_number: number;
  name: string;
  lastname: string;
  age: number;
  career: string;
  salary: number;
}

interface ModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditTeacherModal: React.FC<ModalProps> = ({ teacher, onClose, onSuccess }) => {
  const [updatedTeacher, setUpdatedTeacher] = useState<Teacher | null>(teacher);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedTeacher) {
      setUpdatedTeacher({ ...updatedTeacher, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (updatedTeacher) {
      try {
        const response = await axios.put(`http://10.10.60.15:3000/api/teachers/updateOne/${updatedTeacher.teacher_number}`, updatedTeacher);

        if (response.data.errors) {
          setError(response.data.errors.join(', '));
        } else {
          onSuccess();
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Error updating teacher: ' + err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  return (
    <>
      {updatedTeacher && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Profesor</h5>
                <button type="button" className="close" onClick={onClose}>&times;</button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label htmlFor="teacher_number" className="form-label">Número de Profesor</label>
                      <input
                        type="text"
                        className="form-control"
                        id="teacher_number"
                        value={updatedTeacher.teacher_number}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="name" className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={updatedTeacher.name}
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
                        value={updatedTeacher.lastname}
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
                        value={updatedTeacher.age}
                        onChange={handleChange}
                        required
                        min={1}
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
                        value={updatedTeacher.career}
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
                        value={updatedTeacher.salary}
                        onChange={handleChange}
                        required
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col text-center">
                      <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
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
