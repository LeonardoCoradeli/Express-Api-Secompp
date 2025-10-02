// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Tarefas',
      version: '1.0.0',
      description:
        'Uma API RESTful para gerenciar tarefas, construída com Express, TypeScript e MongoDB.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Task: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único da tarefa'
            },
            title: {
              type: 'string',
              description: 'Título da tarefa'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada da tarefa'
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed'],
              description: 'Status atual da tarefa'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Prioridade da tarefa'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ]
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;