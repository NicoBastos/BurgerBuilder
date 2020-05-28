import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey+Math.random(0,50)} type={igKey} />)
        })
        .reduce((arr, el) => { return arr.concat(el)}, []);
    if(transformedIngredient.length === 0 ){
        transformedIngredient = <p>Please Start adding ingredients!!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger