'use client';
import { useCrudHook } from '@/Context/Context';
import { ClothList } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai';
import { EditForm } from '../EditForm/EditForm';


function HomePage() {
  const {onHandleDelete,openModal} = useCrudHook();
    const [product,setProduct] = useState<ClothList[]>([]);
    const fetchProduct =async (api:string) => {
        try {
          const fetchCloth = await fetch(api,{ cache: 'force-cache' });
        const convIntoJson:ClothList[] = await fetchCloth.json();
        // return convIntoJson;
        setProduct(convIntoJson);
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        fetchProduct(`http://localhost:3000/api/product`);
      },[product]);

      if(product){
        return (
          <>
          <h1 className="text-3xl uppercase text-center font-mono pt-10">Crud Operation in API's</h1>
          <h3 className="uppercase text-center font-mono">Assignmet #01</h3>
      
          <section className="flex flex-wrap justify-center gap-10 py-10 font-mono">
            {product.map((e) => {
              return(
                <div key={e.id} className="flex justify-center items-center flex-col">
              <Image
              className="size-[350px]"
              src={`/images/${e.img}`}
                alt={e.name}
                width={300}
                height={200}
              />
              <h3 className="font-bold">{e.name}</h3>
              <div className='font-mono flex gap-5 pt-1'>
              <button onClick={() => onHandleDelete(e.id)}><AiTwotoneDelete /></button>
              <EditForm prodId={e.id} prodName={e.name} prodImg={e.img} />
              </div>
            </div >
              );
            })}
          </section>
          <div className="flex justify-center mb-5">
            <Link href={`/addproduct`}>
          <button className="font-mono bg-sky-400 px-5 py-3 rounded-md text-white ">Add More</button>
            </Link>
          </div>
          </>
        );
       }else{
        return(
          <>
          Product Not FOund
          </>
        );
       }
}

export default HomePage;