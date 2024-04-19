require("express-async-errors");
require("dotenv/config");

const AppError = require("./utils/AppError");
const uploadConfig = require('./configs/upload');

const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));
app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: error.message,
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
