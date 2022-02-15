import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnHighlighted] = useState();
    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => currentNumber + item.amount, 0);

    const buttonClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`;

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartContext.items])

    return <button className={buttonClasses} onClick={props.onClick}>
        <span className={classes.icon}>
           <CartIcon/>  
        </span>
        <span>Your cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
};

export default HeaderCartButton;
