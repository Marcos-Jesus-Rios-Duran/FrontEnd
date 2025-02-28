import React from 'react'; // Asegúrate de importar React

export const Form: React.FC = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>Registro de alumnos</h3>
        </div>
        <div className="card-body">
          <form action="">
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="txtStudentID" className="form-label">Matrícula</label>
                <input type="number" className="form-control" id="txtStudentID" />
              </div>
              <div className="col-lg-6">
                <label htmlFor="txtName" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="txtName" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="txtLastname" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="txtLastname" />
              </div>
              <div className="col-lg-6">
                <label htmlFor="txtGrade" className="form-label">Grado</label>
                <input type="number" className="form-control" id="txtGrade" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="txtGroup" className="form-label">Grupo</label>
                <input type="text" className="form-control" id="txtGroup" />
              </div>
              <div className="col-lg-6">
                <label htmlFor="txtAverage" className="form-label">Promedio</label>
                <input type="number" className="form-control" id="txtAverage" />
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
    </>
  );
}
