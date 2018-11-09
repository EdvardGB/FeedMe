import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import Recipes from './containers/recipes';
import ShopList from './containers/shopList';
import Fridge from './containers/fridge';
import RecipePage from './containers/recipePage';
import TopBar from './containers/topBar';
import NotFound from './containers/notFound';

import Recipe from './interfaces/recipe'; 
import Category from './interfaces/category';

import sampleData from '../../sampleData';


import * as recipeActions from './actions/recipeAction';
import * as APIService from './services/apiService';
import recipePage from './containers/recipePage';

class App extends PureComponent  {

    constructor(props) {
        super(props); 
    }

    
    componentDidMount(){
        const { fridge } = this.props
        sampleData.recipes.map(recipe => this.props.addRecipe(
            new Recipe(recipe, fridge)))
        sampleData.RecipeCategories.map(category => this.props.addCategory(
            new Category(category)
        ))
    }
    
    render () {
        return (
            <div>
                <div className="App">
                    <TopBar />
                    <Switch>    
                        <Route exact path="/" component={Recipes} />
                        <Route path="/handlekurv" component={ShopList} />
                        <Route path="/kjoleskap" component={Fridge} />
                        <Route path="/:recipe" render={()=> {
                            let match = this.props.recipes.filter(recipe => 
                            {
                                if(this.props.location.pathname === "/" + recipe.title){
                                    return  recipe
                                }
                            })
                            if( match.size > 0){
                                return <RecipePage recipe={match.get(0)} /> 
                            } else { return <NotFound /> }


                        }} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}


App.propTypes  = {
    recipes: PropTypes.object,
    fridge: PropTypes.object
}

function mapStateToProps(state) {

    return {
      recipes: state.get('recipes').get('recipes'),
      fridge: state.get('fridge')

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe : (arg) => {recipeActions.addRecipe(dispatch, arg)},
        addCategory: (arg) => {recipeActions.addCategory(dispatch, arg)}
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))