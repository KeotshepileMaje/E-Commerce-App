import Container from "@/app/components/Container";
import ManageProductsClients from "./ManageProductsClient";
import getProducts from '@/actions/getProducts'
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { products } from "@/utils/products";

const ManageProducts = async () => {
    // const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title='Opps! Access denied'/>
    }

    return (
      <div className="pt-8">
        <Container>
          <ManageProductsClients products={products} />
        </Container>
      </div>
    );
}
 
export default ManageProducts;