export const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Chat API',
          description: 'Chat API Information',
          version: "v1"
      },
      servers: [
          {
              url: "http://localhost:8082"
          }
      ],
  },
  apis: ['./src/routes/*.ts']
}