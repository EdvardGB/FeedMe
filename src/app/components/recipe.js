import Ingredient from './ingredient'

export default class Recipe {
    constructor(data){
        this.cookingDuration = data['cooking_duration_string'];
        this.difficulty = data['difficulty_string'];
        this.id = data.id
        this.title = data.title
        this.ingredients = []
    }

    add(ingredient){
        this.ingredients.append(ingredient)
    }
}
