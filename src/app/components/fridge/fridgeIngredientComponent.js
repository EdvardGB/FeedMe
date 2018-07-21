
import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from "@material-ui/core/Checkbox";
import Typography from '@material-ui/core/Typography';

import '../../styles/main.less';

export default class IngredientComponent extends React.PureComponent { 
    constructor(arg){
        super(arg)
        this.state = {
            ingredient: this.props.ingredient
        }
    }

    onChange(event, checked){
        if(checked){
            this.props.remove(this.props.ingredient)
        }
    }

    render(){ 
        const {
            name
        } = this.props.ingredient
        return <TableRow className="IngredientRecipeListComponent">
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell>
                <Checkbox 
                    onChange={this.onChange.bind(this)}
                />
            </TableCell>

        </TableRow>;
    }
}
