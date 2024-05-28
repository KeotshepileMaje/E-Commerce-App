import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getProductsById from "@/actions/getProductById";

interface IParams {
    productId?: string;
}

const Product = async ({params}: {params: IParams}) => {
    const product = await getProductsById(params)
    const user = await getCurrentUser()
    
    if (!product) return <NullData title='Product with the given Id doesnot exist'/>

    return (
      <div className="p-8">
        <Container>
          <ProductDetails product={product} />
          <div
            className="
                flex
                flex-col
                mt-20
                gap-4
                "
          >
            <AddRating product={product} user={user} />
            <ListRating product={product} />
          </div>
        </Container>
      </div>
    );
}

export default Product;