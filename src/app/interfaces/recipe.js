import Ingredient from './ingredient'

export default class Recipe {
    constructor(data, ingredients){
        this.cookingDuration = data['cooking_duration_string'];
        this.difficulty = data['difficulty_string'];
        this.id = data.id
        this.title = data.title 
        this.ingredients = data.ingredients ? data.ingredients.map(dataIngredient => {
            let match = ingredients.filter(ingredient => ingredient.id == dataIngredient.id)
            if (match.size > 0){
                match.get(0).addRecipe(this)
                return match.get(0) 
            }
            let ingredient = new Ingredient(dataIngredient)
            ingredient.addRecipe(this)
            return ingredient
        }) : []
        this.image = data['feature_image_url']
        this.url = this.title.replace(/\s/g, '%20')
        this.instruction = data['instructions_html']
        this.dummy = data.ingredients ? false : true
        
        if(!this.ingredients){
            this.dummy == true
        }
    
    }

}
