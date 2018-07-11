import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';


class Recipes extends Component {

    constructor(props) {
        super(props); 
    }

    
    render () {
        return (
            <div>
               <div>Search</div>
               <div>Display 5 recipes</div>
            </div>
        )
    }
}

Recipes.propTypes  = {

}

function mapStateToProps(state) {
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes) 