//routes/product.tsx
import ProductPage from "@/pages/product";
import type { Route } from "./+types/product";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Product({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><ProductPage data={data} /></>);
}
    
    