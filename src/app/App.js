import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";

import Recipes from './containers/recipes';
import NotFound from './containers/notFound';


import * as recipeActions from './actions/recipeAction';
import * as APIService from './services/apiService';

class App extends Component {

    constructor(props) {
        super(props); 
    }
    
    testClick(){
        APIService.getAPI('recipes/2580/').then(response => 
            response.json().then(data => console.log(JSON.stringify(data,null,4)))
        )
    }
    
    
    render () {
        return (
            <div>
                <button onClick={this.testClick.bind(this)}>hei</button>
               <div className="App">
                    <Switch>    
                        <Route path="/" component={Recipes} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe : (arg) => {recipeActions.add(dispatch, arg)}
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App) 