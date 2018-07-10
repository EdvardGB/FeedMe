import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";

import Recipies from './containers/recipies';
import NotFound from './containers/notFound';


import * as recipeActions from './actions/recipeAction';
import * as APIService from './services/apiService';

class App extends Component {

    constructor(props) {
        super(props); 
    }

    componentDidMount(){
        APIService.getAPI('products/9329').then(response => 
            response.json().then(data => console.log(data))
        )
    }
    
    render () {
        return (
            <div>
               <div className="App">
                    <Switch>    
                        <Route path="/" component={Recipies} />
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