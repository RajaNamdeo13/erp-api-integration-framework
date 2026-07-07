const swaggerJsdoc = require("swagger-jsdoc");

const options = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "ERP Integration Framework API",

            version: "1.0.0",

            description:
                "Enterprise-grade ERP Integration Framework built using Node.js, Express.js, JWT Authentication, RBAC and ETL workflows."

        },

        servers: [

            {

                url: "http://localhost:3000"

            }

        ],

        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            }

        },

        security: [

            {

                bearerAuth: []

            }

        ]

    },

    apis: [

        "./routes/*.js"

    ]

};

module.exports = swaggerJsdoc(options);