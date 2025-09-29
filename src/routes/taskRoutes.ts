import { Router } from 'express';
import taskController from '../controllers/taskController';
import validateObjectId from '../middlewares/validateObjectId';

const router = Router();

/**
 * @openapi
 * /api/tasks/statistics:
 *   get:
 *     tags:
 *       - Tarefas
 *     summary: Obtém estatísticas das tarefas
 *     description: Retorna um resumo com a contagem total de tarefas e a contagem por status.
 *     responses:
 *       200:
 *         description: Estatísticas das tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 10
 *                 pending:
 *                   type: integer
 *                   example: 5
 *                 in_progress:
 *                   type: integer
 *                   example: 2
 *                 completed:
 *                   type: integer
 *                   example: 3
 */
router.get('/statistics', taskController.getTaskStatistics);

/**
 * @openapi
 * /api/tasks/status/{status}:
 *   get:
 *     tags:
 *       - Tarefas
 *     summary: Filtra tarefas por status
 *     description: Retorna uma lista de tarefas que correspondem ao status fornecido.
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *         description: Status da tarefa
 *     responses:
 *       200:
 *         description: Uma lista de tarefas filtradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Status inválido
 */
router.get('/status/:status', taskController.getTasksByStatus);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tarefas
 *     summary: Lista todas as tarefas
 *     description: Retorna um array com todas as tarefas, com filtros opcionais.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *         description: Filtrar por status.
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filtrar por prioridade.
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', taskController.getAllTasks);

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tarefas
 *     summary: Cria uma nova tarefa
 *     description: Adiciona uma nova tarefa à coleção.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nova Tarefa via Swagger"
 *               description:
 *                 type: string
 *                 example: "Descrição da tarefa."
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 default: pending
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: medium
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados de entrada inválidos.
 */
router.post('/', taskController.createTask);

/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     tags:
 *       - Tarefas
 *     summary: Busca uma tarefa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da tarefa.
 *     responses:
 *       200:
 *         description: Detalhes da tarefa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada.
 *   put:
 *     tags:
 *       - Tarefas
 *     summary: Atualiza uma tarefa existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da tarefa a ser atualizada.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada.
 *   delete:
 *     tags:
 *       - Tarefas
 *     summary: Deleta uma tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da tarefa a ser deletada.
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso.
 *       404:
 *         description: Tarefa não encontrada.
 */
router
  .route('/:id')
  .get(validateObjectId, taskController.getTaskById)
  .put(validateObjectId, taskController.updateTask)
  .delete(validateObjectId, taskController.deleteTask);

export default router;