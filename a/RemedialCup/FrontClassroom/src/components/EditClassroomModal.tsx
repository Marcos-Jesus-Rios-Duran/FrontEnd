import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Classroom {
  classroom_id: string;
  building: string;
  career: string;
  type: string;
  capacity: number;
}

interface ModalProps {
  classroom: Classroom | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditClassroomModal: React.FC<ModalProps> = ({ classroom, onClose, onSuccess }) => {
  const [updatedClassroom, setUpdatedClassroom] = useState<Classroom | null>(classroom);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedClassroom) {
      setUpdatedClassroom({ ...updatedClassroom, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (updatedClassroom) {
      try {
        const response = await axios.put(
          `http://10.10.60.28:3000/api/classrooms/updateOne/${updatedClassroom.classroom_id}`,
          updatedClassroom
        );

        if (response.data.errors) {
          setError(response.data.errors.join(', '));
        } else {
          onSuccess();
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Error updating classroom: ' + err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  return (
    <>
      {updatedClassroom && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Aula</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="classroom_id" className="form-label"><b>ID del Aula</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="classroom_id"
                      value={updatedClassroom.classroom_id}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="building" className="form-label"><b>Edificio</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="building"
                      value={updatedClassroom.building}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="career" className="form-label"><b>Carrera</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="career"
                      value={updatedClassroom.career}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label"><b>Tipo</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      value={updatedClassroom.type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="capacity" className="form-label"><b>Capacidad</b></label>
                    <input
                      type="number"
                      className="form-control"
                      id="capacity"
                      value={updatedClassroom.capacity}
                      onChange={handleChange}
                      required
                      min={0}
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
