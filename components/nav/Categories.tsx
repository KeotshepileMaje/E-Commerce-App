"use client";

import Category from "./Category";
import { categories } from "@/utils/category";
import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname()

  const isMainPage = pathname === '/'
  if (!isMainPage) return null

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <div key={item.label}>
              <Category
                label={item.label}
                icon={item.icon}
                selected={category === item.label || (category === null && item.label === 'All' )}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
