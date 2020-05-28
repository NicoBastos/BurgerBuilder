import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Price is: {props.totalPrice}</p>
      {controls.map((control) => (
        <BuildControl
          label={control.label}
          key={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          lessDisabled={props.lessDisabled[control.type]}
          moreDisabled={props.moreDisabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.purchasing}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
