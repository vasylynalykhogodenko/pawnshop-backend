const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pawnshop API Documentation',
      version: '1.0.0',
      description: `
        API documentation for the Pawnshop Management System

        ## User Roles
        The system has two types of users with different permissions:

        1. **Admin**
           - Full access to all endpoints
           - Can manage item categories
           - Can delete clients and transactions
           - Can view all data
        
        2. **Employee**
           - Can create and manage clients
           - Can create and manage pawn transactions
           - Cannot delete transactions and clients
           - Cannot manage item categories

        ## Authentication
        - All endpoints require JWT Bearer token authentication
        - Token must include user role ('Admin' or 'Employee')
        - Current UTC time format: YYYY-MM-DD HH:MM:SS
        - Credentials for access below
      `,
      credentials: [
        { email: 'admin@gmail.com', password: 'Admin@123' },
        { email: 'employee@gmail.com', password: 'Employee@123' },
      ],
      contact: {
        name: 'vasylynalykhogodenko',
        url: 'https://github.com/vasylynalykhogodenko'
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
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
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;