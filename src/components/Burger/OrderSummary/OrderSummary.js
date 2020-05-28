import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {    
    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey+1}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
        });

        return( 
            <React.Fragment>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total: ${this.props.total}</p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.pruchaseContinue} btnType="Success">CONTINUE</Button>
            </React.Fragment>
            )   
    } 
}

export default OrderSummary;