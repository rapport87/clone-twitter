// // import ProductList from "@/components/product-list";
// import db from "@/lib/db";
// // import { PlusIcon } from "@heroicons/react/24/solid";
// import { Prisma } from "@prisma/client";
// import { unstable_cache as nextCache, revalidatePath } from "next/cache";
// import Link from "next/link";

// const getCachedProducts = nextCache(getInitialProducts, ["home-products"]);

// async function getInitialProducts() {
//   const products = await db.tweet.findMany({
//     select: {
//       content: true,
//       id: true,
//       createdAt : true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export const metadata = {
//   title: "Home",
// };

// //export const dynamic = "force-dynamic";
// // export const revalidate = 60;

// export default async function Home() {
//   const initialProducts = await getInitialProducts();
//   const revalidate = async () => {
//     "use server";
//     revalidatePath("/home");
//   };
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }