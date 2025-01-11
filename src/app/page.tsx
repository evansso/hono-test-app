import { Suspense } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="p-4 max-w-7xl mx-auto w-full">
      <h1>Products</h1>
      <div className="mt-4">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}

interface Products {
  id: number;
  name: string;
  price: number;
  description: string;
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className=" h-16 w-full" />
            <Skeleton className=" h-16 w-full" />
          </CardHeader>
          <CardFooter>
            <Skeleton className=" h-16 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

async function ProductList() {
  const res = await fetch("https://hono-server.evansso.workers.dev/");
  const products = (await res.json()) as Products[];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

function ProductCard({ product, key }: { product: Products; key: number }) {
  return (
    <Card key={key}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p>{product.price}</p>
      </CardFooter>
    </Card>
  );
}
