import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import { product } from '../context/products/products';
import { getAllProducts, getAllProductsA, getChillProducts} from '../utils/actions';
import PagesTop from '../components/body/pagesTop';
import Products from '../components/body/Products';
import { Button, Dropdown, Menu } from 'antd';
import { HomePageProps } from './product/[slug]';
import { GetStaticPaths } from 'next'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";

import Link from 'next/link';
import { categoryArr } from '../data/category';


interface pathProp {
  path:string | string[]
}


// export const getStaticProps: GetStaticProps<HomePageProps>= async ({param}) => {
//   const products:product[] = await getPatProducts(param)
//   return { props: { 
//     products,
//   } };
// };


// export const getStaticPaths: GetStaticPaths<pathProp> = async () => {

//   const products = await getAllProductsA()
//   const paths = products.map((productU) => ({params: {parent: productU.parent}}) )
//   return {
//     paths: paths,
//     fallback: false
//   }
// }


const CategoryPage = () => {
  const [Allproduct, setAllroduct] = useState<product[]>([])
  const [sort, setSort] = useState(0)
  const [category, setCategory] = useState<product[]>([])
  const {query} = useRouter()
  const param = query.slug as string
  console.log(query)

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <p onClick={(e) => setSort(2)}>Lowest to Higest</p>
          ),
        },
        {
          key: '2',
          label: (
            <p onClick={(e) => setSort(1)}>Highest to Lowest</p>
          ),
        },
      ]}
    />
  );
  

  useEffect( () => {

    const Product = async() => {
      const product = await getAllProductsA()
      setAllroduct(product)
      // console.log(product+ 'you')
    }
    Product()
  }, [])

  const find = Allproduct.filter(obj => {
    return obj.parent === param
  })
  const children = Allproduct.filter(obj => {
    return obj.children === param
  })
  console.log(children)
  const getProduct= () => {
    if(find.length !== 0){
      setCategory(find)
    }else {
      setCategory(children)
    }
  }

  
  
  console.log(Allproduct)
  
  const Descending = [...category].sort((a, b) => b.price - a.price);
  // console.log(numDescending);

  const Ascending = [...category].sort((a, b) => a.price - b.price);
  // console.log(numAscending);
  console.log(find)

  return (
    <div className='p-6 h-2/4 bg-gray-50'>
      <div >
      <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'> 
          <div className='flex flex-col items-center rounded-lg text-white p-4' style={{backgroundImage:'url(/image3.webp)',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'bottom',width:'100%',height:'10rem' }}>
            <span className=' font-medium'>Taste of</span>
            <span className='text-xl font-semibold'>Fresh & Natural</span>
            <span className='text-sm'>Weekend discount offer</span>
            <Link href={'/children/Fresh Vegetable'}>
            <button className='bg-emerald-400 text-xs py-2 px-4 rounded-3xl mt-4'>Shop Now</button>
            </Link>
            
          </div>
          <div className='flex flex-col items-center rounded-lg  text-white p-4' style={{backgroundImage:'url(/image4.webp)',backgroundRepeat:'no-repeat',backgroundSize:'cover',height:'10rem',width:'100%', backgroundPosition:'bottom',}}>
            <span className=' font-medium'>Taste of</span>
            <span className='text-xl font-semibold'>Fish & Meat</span>
            <span className='text-sm'>Weekend discount offer</span>
            <Link href={'/Fish & Meat'}>
            <button className='bg-emerald-400 text-xs py-2 px-4 rounded-3xl mt-4'>Shop Now</button>
            </Link>
            
          </div>
          <div className='flex flex-col items-center rounded-lg  text-white p-4' style={{backgroundImage:'url(/image5.webp)',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'bottom', height:'10rem',width:'100%'}}>
            <span className=' font-medium'>Taste of</span>
            <span className='text-xl font-semibold'>Bread & Bakery</span>
            <span className='text-sm'>Weekend discount offer</span>
            <Link href={'/Biscuits & Cakes'}>
            <button className='bg-emerald-400 text-xs py-2 px-4 rounded-3xl mt-4'>Shop Now</button>
            </Link>
            
          </div>
      </div>
      <div>
      <Swiper
        slidesPerView={7}
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={true}
        // navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[ Pagination]}
        className="mySwiper"  style={{height:'6rem',marginTop:'3rem' ,marginBottom:'1rem',paddingBottom:'2rem'}}
      >
        {
          categoryArr.map((cat, index) => (
            <SwiperSlide key={index}>
            <div className='flex flex-col items-center bg-white py-3 px-1 rounded-lg h-[6rem]'>
              <div className='h-7 w-7 rounded-xl shadow-lg' style={{backgroundImage:`url(${cat.icon})`,backgroundRepeat:'no-repeat',backgroundSize:"contain", backgroundPosition:''}}>
              </div>
              <div className='p-1 flex flex-col '>
                <Link href={`/${cat.parent}`} >
                  <h5 className='text-[10px] text-gray-600 hover:text-emerald-500 cursor-pointer'>{cat.parent}</h5>
                </Link>
              </div>
            </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      </div>
    </div>      
    <div className=' flex justify-between items-center my-5 bg-orange-200 p-2 rounded'>
        <p className='align-middle m-0'>Total <span className='font-semibold'>{find.length}</span>  items Found</p>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
          <Button>Sort by Price</Button>
          </Dropdown>
        </div>
      </div>
      <div className='grid md:grid-cols-4 lg:grid-cols-5 ph:grid-cols-2 sm:grid-cols-3  gap-4 my-12'>
      {sort === 0 &&  find.length !== 0 ?
          find.map((product) => (
          <Products product={product} key={product._id}/>
      )) : children.map((product) => (
        <Products product={product} key={product._id}/> ))
      }
      {
        sort === 1 && Descending.map((product) => (
          <Products product={product} key={product._id}/>
        ))
      }
      {
        sort === 2 && Ascending.map((product) => (
          <Products product={product} key={product._id}/>
        ))
      }
      </div>
      </div>
    
  )
}

export default CategoryPage