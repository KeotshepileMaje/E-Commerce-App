interface IParams {
    productId?: string;
}

const Product = ({params}: {params: IParams}) => {
    console.log('param,,, ',params)
    return ( 
        <div>Product Page</div>
    );
}

export default Product;