import Ingredient from './ingredient'

export default class Recipe {
    constructor(data){
        this.cookingDuration = data['cooking_duration_string'];
        this.difficulty = data['difficulty_string'];
        this.id = data.id
        this.title = data.title
        this.ingredients = data.ingredients.map(ingredient => new Ingredient(ingredient.product))  
        this.image = data['feature_image_url']
    }

}
