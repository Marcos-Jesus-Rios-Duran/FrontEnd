import React from 'react'; // Asegúrate de importar React

export const FormTeacher: React.FC = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>Registro de Profesores</h3>
        </div>
        <div className="card-body">
          <form action="">
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="txtTeacherNumber" className="form-label">Número de Profesor</label>
                <input type="number" className="form-control" id="txtTeacherNumber" />
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
                <label htmlFor="txtAge" className="form-label">Edad</label>
                <input type="number" className="form-control" id="txtAge" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="txtCareer" className="form-label">Carrera</label>
                <input type="text" className="form-control" id="txtCareer" />
              </div>
              <div className="col-lg-6">
                <label htmlFor="txtSalary" className="form-label">Salario</label>
                <input type="number" className="form-control" id="txtSalary" />
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
