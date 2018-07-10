
import React from 'react';

export default class IngredientComponent extends React.PureComponent { 
	remove(){
        this.props.remove(this.props.ingredient)
    }
    
    render() {
		return (
			<div>
				Ingredient : {this.props.ingredient.name}
				<button onClick={this.remove.bind(this)}>X</button>
			</div>
		);
	}
}
