import Link from "next/link";
import { Dialog,DialogContent,DialogHeader,DialogTrigger } from "@/components/ui/dialog";
export const itemList = [
  {
    id:1,
    value:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste exercitationem, perferendis soluta perspiciatis nobis maiores a alias assumenda amet ipsam. Cum possimus placeat, delectus, adipisci optio officia maxime non at voluptatem quis accusantium. Possimus facere sint placeat. Molestiae quas maxime error earum, corporis ipsa nemo!'
  },
  {
    id:2,
    value:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste exercitationem, perferendis soluta perspiciatis nobis maiores a alias assumenda amet ipsam. Cum possimus placeat, delectus, adipisci optio officia maxime non at voluptatem quis accusantium. Possimus facere sint placeat. Molestiae quas maxime error earum, corporis ipsa nemo!'
  },
  {
    id:3,
    value:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste exercitationem, perferendis soluta perspiciatis nobis maiores a alias assumenda amet ipsam. Cum possimus placeat, delectus, adipisci optio officia maxime non at voluptatem quis accusantium. Possimus facere sint placeat. Molestiae quas maxime error earum, corporis ipsa nemo!'
  },
  {
    id:4,
    value:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste exercitationem, perferendis soluta perspiciatis nobis maiores a alias assumenda amet ipsam. Cum possimus placeat, delectus, adipisci optio officia maxime non at voluptatem quis accusantium. Possimus facere sint placeat. Molestiae quas maxime error earum, corporis ipsa nemo!'
  }
]
export default function Home() { 
  return (
  <>
  <section className="flex">
  {
    itemList.map((e) => {
      return(
       <>
        <Link key={e.id} href={`/product/${e.id}`}>
          <p className="shadow-lg font-mono p-5">
            {e.value}
          </p>
        </Link>
       </>
      );
    })
  }
  </section>
  </>
  );
}
