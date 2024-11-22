import HomePage from "@/components/HomePage/HomePage";
import { ClothList } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

// const fetchProduct =async (api:string) => {
//   try {
//     const fetchCloth = await fetch(api);
//   const convIntoJson:ClothList[] = await fetchCloth.json();
//   return convIntoJson;
//   } catch (error) {
//     console.log(error)
//   }
// }
export default async function Home() {
//   const clthProd:ClothList[] | undefined = await fetchProduct(`http://localhost:3000/api/product`);
//  if(clthProd){
//   return (
//     <>
//     <h1 className="text-3xl uppercase text-center font-mono pt-10">Crud Operation in API's</h1>
//     <h3 className="uppercase text-center font-mono">Assignmet #01</h3>

//     <section className="flex flex-wrap justify-center gap-10 py-10 font-mono">
//       {clthProd.map((e) => {
//         return(
//           <div key={e.id} className="flex justify-center items-center flex-col">
//         {/* <Image
//         className="size-[350px]"
//         src={`/images/${e.img}`}
//           alt={e.name}
//           width={300}
//           height={200}
//         /> */}
//         <h3 className="font-bold">{e.name}</h3>
//       </div>
//         );
//       })}
//     </section>
//     <div className="flex justify-center mb-5">
//       <Link href={`/addproduct`}>
//     <button className="font-mono bg-sky-400 px-5 py-3 rounded-md text-white ">Add More</button>
//       </Link>
//     </div>
//     </>
//   );
//  }else{
//   return(
//     <>
//     Product Not FOund
//     </>
//   );
//  }
  return(
    <>
<HomePage/>
</>
  );
}
