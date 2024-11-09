// app/products-category/[categoryName]/page.js

import GlobalApi from '@/app/_utils/GlobalApi'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

async function ProductCategory({ params }) {
  const productList = await GlobalApi.getProductsByCategory(params.categoryName);
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-2 mt-0 bg-primary text-white font-bold text-center text-2xl">
        {params.categoryName}
      </h2>
      <TopCategoryList categoryList={categoryList} />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

// Correctly add generateStaticParams() to handle the dynamic categories
export async function generateStaticParams() {
  const categoryList = await GlobalApi.getCategoryList();

  return categoryList.map((category) => ({
    categoryName: category.name,  // Ensure you’re using the correct field from the API
  }));
}

export default ProductCategory;
