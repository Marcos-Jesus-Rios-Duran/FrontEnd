import classroomDAO from "../dao/classrooms.dao.js";

const classroomsController = {};

// Insertar una nueva aula
classroomsController.insert = async (req, res) => {
    try {
        // Verificar si ya existe una aula con el mismo classroom_id
        const existingClassroom = await classroomDAO.getOne(req.body.classroom_id);
        if (existingClassroom) {
            return res.status(400).json({
                errors: ["Classroom ID already exists"]
            });
        }
        

        // Si no existe, proceder a crear la nueva aula
        const response = await classroomDAO.insert(req.body);
        res.json({
            data: {
                message: "Classroom saved successfully",
                classroom: response
            }
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        });
    }
};

// Obtener todas las aulas
classroomsController.getAll = (req, res) => {
    classroomDAO.getAll()
        .then((classrooms) => {
            res.json({ data: classrooms });
        })
        .catch((error) => {
            res.json({ data: { message: error } });
        });
};

// Obtener una aula por ID
classroomsController.getOne = (req, res) => {
    classroomDAO.getOne(req.params.classroom_id)
        .then((classroom) => {
            if (classroom != null) {
                res.json({ data: classroom });
            } else {
                res.json({ data: { message: "Classroom not found" } });
            }
        })
        .catch((error) => {
            res.json({ data: { message: error } });
        });
};

// Actualizar una aula
classroomsController.updateOne = async (req, res) => {
    try {
        const result = await classroomDAO.updateOne(req.body, req.params.classroom_id);
        if (result) {
            res.json({
                data: {
                    message: "Classroom updated successfully",
                    result: result
                }
            });
        } else {
            res.status(404).json({ data: { message: "Classroom not found" } });
        }
    } catch (error) {
        res.status(500).json({
            data: { message: error.message }
        });
    }
};

// Eliminar una aula
classroomsController.deleteOne = (req, res) => {
    classroomDAO.deleteOne(req.params.classroom_id)
        .then((classroomDeleted) => {
            res.json({
                data: {
                    message: "Classroom deleted successfully",
                    classroom_delete: classroomDeleted
                }
            });
        })
        .catch((error) => {
            res.status(500).json({ data: { message: error } });
        });
};
// Eliminar todas las aulas
classroomsController.deleteAll = async (req, res) => {
    try {
        // Eliminar todas las aulas de la base de datos
        await classroomDAO.deleteAll();

        res.json({
            message: 'All classrooms deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        });
    }
};

export default classroomsController;
