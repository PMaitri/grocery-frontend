import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

// const generateSlug = (name) => {
//     return name
     
//       .replace(/&/g, 'and')
//       .replace(/\s+/g, '-')
//       .replace(/[^\w-]+/g, '');
//   };

  function TopCategoryList({ categoryList}) {
  return (
    <div className='flex gap-5 mt-3 overflow-auto mx-7 md:mx-30 justify-center '>
        {categoryList.map((category, index) => {

        //  const slug = generateSlug(category.attributes.name); 

          return (
            <Link href={'/products-category/' + category.attributes.name} key={index} 
            className="flex flex-col bg-gray-100 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-slate-200 w-[150px] min-w-[100px] h-30">
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
  )
}

export default TopCategoryList
