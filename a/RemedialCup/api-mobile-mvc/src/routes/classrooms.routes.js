import { Router } from 'express';
import classroomsController from '../controllers/classrooms.controller.js';

const classroomsRoutes = Router();

classroomsRoutes.get('/getAll', classroomsController.getAll);
classroomsRoutes.get('/getOne/:classroom_id', classroomsController.getOne);
classroomsRoutes.post('/insert', classroomsController.insert);
classroomsRoutes.put('/updateOne/:classroom_id', classroomsController.updateOne);
classroomsRoutes.delete('/deleteOne/:classroom_id', classroomsController.deleteOne);
// Ruta para borrar todas las aulas
classroomsRoutes.delete('/deleteAll', classroomsController.deleteAll);

export default classroomsRoutes;
