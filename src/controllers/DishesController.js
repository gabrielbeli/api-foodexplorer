const AppError = require('../utils/AppError');

const DishRepository = require('../repositories/DishRepository');
const DishCreateServices = require('../services/DishCreateServices');
const DishUpdateServices = require('../services/DishUpdateServices');
class DishesController {
  async create(request, response) {
    let { name, category, price, description, ingredients } = request.body;

    const dishRepository = new DishRepository();
    const dishCreateServices = new DishCreateServices(dishRepository);
    const { dish_id } = await dishCreateServices.execute({
      name,
      category,
      price,
      description,
      ingredients,
    });
    
    return response.status(201).json({ id: dish_id });
  }

  async update(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const { id } = request.params;
  
    const dishRepository = new DishRepository();
    const dishUpdateServices = new DishUpdateServices(dishRepository);
  
    try {
      await dishUpdateServices.execute({
        id,
        name,
        category,
        price,
        description,
        ingredients,
      });
  
      return response.json({ message: 'Prato atualizado com sucesso' });
    } catch (error) {
      console.error(error); 
      return response.status(500).json({ error: 'Não foi possível atualizar o prato' });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    const dishRepository = new DishRepository();

    const dish = await dishRepository.findById(id);

    if (!dish) {
      throw new AppError('Prato não encontrado');
    }

    const dishIngredients = await dishRepository.getDishIngredients(id);
    
    return response.json({ ...dish, ingredients: dishIngredients});
  }

  async index(request, response) {

    const { search } = request.query;

    const dishRepository = new DishRepository();
    const dishes = await dishRepository.findDishByNameOrIngredients(search);

    return response.json(dishes);
  }

  async delete(request, response) {
    const { id } = request.params;

    const dishRepository = new DishRepository();
    await dishRepository.removeDish(id);

    return response.json();
  }
}
module.exports = DishesController;