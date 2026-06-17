import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec =
  swaggerJsdoc({
    definition: {
      openapi: "3.0.0",

      info: {
        title:
          "EIS Auth API",
        version: "1.0.0",
      },

      servers: [
        {
          url:
            "http://localhost:4100/api/auth",
        },
      ],
    },

    apis: [
      "./src/modules/**/*.js",
    ],
  });