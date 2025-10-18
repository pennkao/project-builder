//routes/products.tsx
import ProductsPage from "@/pages/products";
import type { Route } from "./+types/products";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Products({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<>adfdasfadfadfadfadf</>);
}
    
    