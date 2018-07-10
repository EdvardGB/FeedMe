
import React from 'react';

import IngredientComponent from './ingredientComponent';

export default class RecipeComponent extends React.PureComponent { 
	remove(){
        this.props.remove(this.props.recipe)
    }
    
    render() {
		return (
            <div>
                Recipe = {this.props.recipe.name}
                <button onClick={this.remove.bind(this)}>X</button>
                <div>Contains:{this.props.recipe.ingredients.map(ingredient => {
                    return <IngredientComponent ingredient={ingredient}/>
                })}</div>
            </div>
		);
	}
}
