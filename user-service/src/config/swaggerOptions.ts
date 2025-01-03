export const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Authentication API',
          description: 'Auth API Information',
          version: "v1"
      },
      servers: [
          {
              url: "http://localhost:8081"
          }
      ],
  },
  apis: ['./src/routes/*.ts']
}