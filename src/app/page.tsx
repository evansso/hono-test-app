import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div>
      <h1>Products</h1>
      <div>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductCard />
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
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function ProductCard() {
  const res = await fetch("https://hono-server.evansso.workers.dev/", {
    cache: "no-store",
  });
  const products = (await res.json()) as Products[];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{product.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
