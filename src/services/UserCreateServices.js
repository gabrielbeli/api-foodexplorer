const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, isAdmin }) {
    if (!name || !email || !password) {
      throw new AppError('Informe todos os campos');
    }

    if (password.length < 6) {
      throw new AppError('Senha deve conter no mínimo 6 digitos');
    }

    const emailInUse = await this.userRepository.findByEmail(email);

    if (emailInUse) {
      throw new AppError('Este e-mail já está sendo usado');
    }

    const hashedPassword = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
  }
}

module.exports = UserCreateServices;