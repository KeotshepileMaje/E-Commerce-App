import { truncateText } from "@/utils/truncate";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/product/ProductCard";
import NullData from "./components/NullData";
import getProducts, { IProductParams } from "@/actions/getProducts";


interface HomeProps {
  searchParams: IProductParams;
}


const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title="Oops! No products found" />;
  }

  

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div
          className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        2xl:grid-col-6 
        gap-8
        "
        >
          {products.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Home