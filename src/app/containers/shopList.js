import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import IngredientComponent from '../components/shoplist/shoplistIngredientComponent';

class ShopList extends PureComponent {

    constructor(props) {
        super(props); 
    }

    
    render () {
        return (
            <div>
                <NavLink to='/'>recipes</NavLink>
                {this.props.ingredients.map(ingredient => 
                    <IngredientComponent 
                        key={ingredient.id} 
                        ingredient={ingredient} 
                    />
                )}
            </div>
        )
    }
}

ShopList.propTypes  = {
    ingredients: PropTypes.object
}

function mapStateToProps(state) {
    return {
      ingredients: state.get('shopList')
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopList)