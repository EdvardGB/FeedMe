
import React from 'react';

import { Button, Panel } from 'react-bootstrap';

export default class IngredientComponent extends React.PureComponent { 
	remove(){
        this.props.remove(this.props.ingredient)
    }
    
    render() {
		return (
			<Panel>
                <Panel.Body>
		            Ingredient = {this.props.ingredient.name}
                    <Button onClick={this.remove.bind(this)} bsStyle="danger">X</Button>
                </Panel.Body>
		    </Panel>
		);
	}
}
