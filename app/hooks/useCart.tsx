import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductoCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}

export const CartContext = createContext<CartContextType | null >(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems:any = localStorage.getItem('eshopCartItems');
        const locallySavedProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(locallySavedProducts);
    },[]);

    const handleAddProductoCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }

            toast.success('Product added to Cart')
            localStorage.setItem(
                'eshopCartItems', 
                JSON.stringify(updatedCart)
            )
            return updatedCart
        })
    },[]);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            });

            setCartProducts(filteredProducts);
            toast.success('Product removed');
            localStorage.setItem(
                'eshopCartItems',
                 JSON.stringify(filteredProducts)
            );

            
        };
    },[]);

    const handleCartQtyIncrease = useCallback( 
        (product: CartProductType) => {
            let updatedCart;

            if (product.quantity === 99) {
                return toast.error('Opps! Minimum reached')
            }
            if (cartProducts) {
                updatedCart = [...cartProducts]
                const existingIndex = cartProducts.findIndex(
                    (item) => item.id === product.id
                )
                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
                }

                setCartProducts(updatedCart)
                localStorage.setItem(
                    'eshopCartItems',
                     JSON.stringify(updatedCart)
                );
            }

            
        },
        [cartProducts]
    );

    const handleCartQtyDecrease = useCallback( 
        (product: CartProductType) => {
            let updatedCart;

            if (product.quantity === 99) {
                return toast.error('Opps! Maximum reached')
            }
            if (cartProducts) {
                updatedCart = [...cartProducts]
                const existingIndex = cartProducts.findIndex(
                    (item) => item.id === product.id
                )
                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
                }

                setCartProducts(updatedCart)
                localStorage.setItem(
                    'eshopCartItems',
                     JSON.stringify(updatedCart)
                );
            }    
        },
        [cartProducts]
    );

    const handleClearCart = useCallback(
        () => {
            setCartProducts(null)
            setCartTotalQty(0)
            localStorage.setItem(
                'eshopCartItems',
                 JSON.stringify(null)
            );
        },
        [cartProducts]
    )

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductoCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
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

