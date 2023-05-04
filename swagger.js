const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Games API",
    description: "And API to manage games info, and played checklist",
  },
  host: "cse341-alt-second-project.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
