import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Products</h1>
      <Products />
    </div>
  );
}


 interface Products {
  id: number;
  name: string;
  price: number;
  description: string;
 }

 async function Products() {
  const res = await fetch('https://hono-server.evansso.workers.dev/');
  const products = await res.json() as Products[];
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  )
 }