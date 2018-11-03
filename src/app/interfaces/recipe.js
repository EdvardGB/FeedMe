import Ingredient from './ingredient'

export default class Recipe {
    constructor(data){
        this.cookingDuration = data['cooking_duration_string'];
        this.difficulty = data['difficulty_string'];
        this.id = data.id
        this.title = data.title 
        this.ingredients = data.ingredients ? data.ingredients.map(ingredient => new Ingredient(ingredient)) : []
        this.image = data['feature_image_url']
        this.url = this.title.replace(/\s/g, '%20')
        this.instruction = data['instructions_html']
        this.dummy = data.ingredients ? false : true
        
        if(!this.ingredients){
            this.dummy == true
        }
    
    }

}
