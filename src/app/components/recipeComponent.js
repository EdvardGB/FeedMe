
import React from 'react';
import PropTypes from 'prop-types';


import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import IngredientComponent from './ingredientComponent';

import '../styles/main.less';
  

export default class RecipeComponent extends React.PureComponent { 
    constructor(arg){
        super(arg)
    }

	remove(){
        this.props.remove(this.props.recipe)
    }
    
    handleExpandClick(){
      this.setState(state => ({ expanded: !state.expanded }));
    };
    
    render() {
        const { 
            recipe,
            classes 
        } = this.props;
		return (
            <div>
                <Card className="card">
                    <CardMedia
                        className="media"
                        image={recipe.image}
                        title={recipe.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {recipe.title}
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
                <h4>{this.props.recipe.title}</h4>
                <button onClick={this.remove.bind(this)}>X</button>
                <div>Contains:{this.props.recipe.ingredients.map(ingredient => {
                    return <IngredientComponent key={ingredient.id} ingredient={ingredient}/>
                })}</div>
            </div>
		);
	}
}


RecipeComponent.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
  };
