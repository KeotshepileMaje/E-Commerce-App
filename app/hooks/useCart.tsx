import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductoCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null >(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProduct] = useState<CartProductType[] | null>(null)

    useEffect(() => {
        const cartItems:any = localStorage.getItem('eshopCartItems')
        const locallySavedProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProduct(locallySavedProducts)
    },[])

    const handleAddProductoCart = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }

            toast.success('Product added to Cart')
            localStorage.setItem('eshopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    },[])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductoCart
    }

    return ( 
        <CartContext.Provider value={value} {...props}/>
    );
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === null) {
        throw new Error('useCart must be used within a CartContextProvider')
    }

    return context
}

