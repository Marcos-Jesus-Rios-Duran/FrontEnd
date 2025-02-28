import React from 'react'; // Asegúrate de importar React

interface Student {
  student_id: number;
  name: string;
  lastname: string;
  grade: number;
  group: string;
  average: number;
}

const students: Student[] = [
  {
    student_id: 1,
    name: "John",
    lastname: "Doe",
    grade: 1,
    group: "A",
    average: 90,
  },
  {
    student_id: 2,
    name: "Jane",
    lastname: "Smith",
    grade: 2,
    group: "B",
    average: 85,
  },
  // Agrega más datos de ejemplo según sea necesario
];

export const StudentTable: React.FC = () => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-blue-background">
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
            {students.map(student => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.lastname}</td>
                <td>{student.grade}</td>
                <td>{student.group}</td>
                <td>{student.average}</td>
                <td colSpan={2}>
                  <button className="btn btn-success btn-sm me-2">Editar</button>
                  <button className="btn btn-danger btn-sm">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
