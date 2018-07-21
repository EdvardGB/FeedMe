
import React from 'react';
import PropTypes from 'prop-types';


import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell';  
import Checkbox from "@material-ui/core/Checkbox";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';


import IngredientComponent from './recipeIngredientComponent';

import '../../styles/main.less';
  

export default class RecipeComponent extends React.PureComponent { 
    constructor(arg){
        super(arg)
        this.state = { 
            expanded: false,
            refresh: false
        };
    }

    getRelativeIngredients(){
        let numbIng = this.props.recipe.ingredients.length
        let numbFridge = 0
        this.props.recipe.ingredients.forEach(recipeIng =>{
            this.props.fridge.forEach(fridgeIng => {
                if(fridgeIng === recipeIng){
                    numbFridge+=1
                }
            })
        })
        return numbFridge + "/" + numbIng
    }

	onChange(event, checked){
        if(checked){
            this.props.recipe.ingredients.forEach(ingredient => {
                ingredient.inShoppingList ?
                    null
                :   this.props.addIngredient(ingredient);
            })
        } else {
            this.props.recipe.ingredients.forEach(ingredient => {
                ingredient.inShoppingList ?
                    this.props.removeIngredient(ingredient)
                :   null;
            })
        }
        this.setState({refresh: !this.state.refresh})
    }
    
    handleExpandClick(){
      this.setState({ expanded: !this.state.expanded });
    };
    
    render() {
        const { 
            recipe
        } = this.props;
		return (
            <div>
                <Card className="recipe">
                    <CardMedia
                            className="recipe-media"
                            image={recipe.image}
                        />
                    <CardHeader
                        action={
                        <IconButton
                            onClick={this.handleExpandClick.bind(this)}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        }
                        title={recipe.title}
                        subheader={this.getRelativeIngredients()}

                    />
                    
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ingredients</TableCell>
                                    <TableCell>Add to shoppinglist</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow className="IngredientRecipeListComponent">
                                    <TableCell component="th" scope="row">
                                        
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox  
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </TableCell>
                                </TableRow>
                                {this.props.recipe.ingredients.map(ingredient => 
                                    <IngredientComponent 
                                        key={ingredient.id} 
                                        ingredient={ingredient} 
                                        add={this.props.addIngredient}
                                        remove={this.props.removeIngredient}
                                        refresh={this.state.refresh}
                                    />
                                
                                )}
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
		);
	}
}


RecipeComponent.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
  };
