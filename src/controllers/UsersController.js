const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

const UserRepository = require("../repositories/UserRepository");
const UserCreateServices = require("../services/UserCreateServices");
class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const userRepository = new UserRepository();
    const userCreateServices = new UserCreateServices(userRepository);

    await userCreateServices.execute({ name, email, password, isAdmin });

    return response.json();
  }
 }

 module.exports = UsersController;