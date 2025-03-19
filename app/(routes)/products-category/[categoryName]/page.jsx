// import GlobalApi from '@/app/_utils/GlobalApi';
// import React from 'react';
// import TopCategoryList from '../_components/TopCategoryList';
// import ProductList from '@/app/_components/ProductList';

// // Main ProductCategory component
// async function ProductCategory({ params }) {
//   const categoryName = decodeURIComponent(params.categoryName); // Decode before using it in API calls

//   const productList = await GlobalApi.getProductsByCategory(categoryName);
//   const categoryList = await GlobalApi.getCategoryList();

//   return (
//     <div>
//       <h2 className="p-2 mt-0 bg-primary text-white font-bold text-center text-2xl">
//         {categoryName}
//       </h2>
//       <TopCategoryList categoryList={categoryList} />
//       <div className="p-5 md:p-10">
//         <ProductList productList={productList} />
//       </div>
//     </div>
//   );
// }


// // Static Params generation for dynamic routes
// export async function generateStaticParams() {
//   const categoryList = await GlobalApi.getCategoryList();

//   // Generate static paths, ensuring category names are URL-encoded
//   return categoryList.map((category) => {
//     return {
//       categoryName: encodeURIComponent(category.attributes.name),  // Ensure special characters are encoded
//     };
//   });
// }

// export default ProductCategory;
import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

// Main ProductCategory component
async function ProductCategory({ params }) {
  const categoryName = decodeURIComponent(params.categoryName); // Decode before using it in API calls

  const productList = await GlobalApi.getProductsByCategory(categoryName);
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-2 mt-0 bg-primary text-white font-bold text-center text-2xl">
        {categoryName}
      </h2>
      <TopCategoryList categoryList={categoryList} />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} categoryName={categoryName} />
      </div>
    </div>
  );
}

// Static Params generation for dynamic routes
export async function generateStaticParams() {
  const categoryList = await GlobalApi.getCategoryList();

  return categoryList.map((category) => {
    return {
      categoryName: encodeURIComponent(category.attributes.name),
    };
  });
}

export default ProductCategory;
