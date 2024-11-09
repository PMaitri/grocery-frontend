import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


// const generateSlug = (name) => {
//   return name

//     .replace(/&/g, 'and')       
//     .replace(/\s+/g, '-')       
//     .replace(/[^\w-]+/g, '');    
// };

const CategoryList = ({ categoryList }) => {
  return (
    <div>
      <h2 className="text-primary font-bold text-3xl h-10 mt-10">Shop by Category</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-12'>
        {categoryList.map((category, index) => {

          // const slug = generateSlug(category.attributes.name); 

          return (
            <Link href={'/products-category/' + category.attributes.name} key={index} className="flex flex-col items-center bg-gray-100 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-slate-200">
              <Image 
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.attributes?.icon?.data?.[0]?.attributes?.url}`}
                width={100}
                height={95}
                alt='icon'
                className='group-hover:scale-110 transition-all ease-in-out'
                unoptimized={true} 
              />
              <h2 className='text-center font-semibold'>{category.attributes.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
