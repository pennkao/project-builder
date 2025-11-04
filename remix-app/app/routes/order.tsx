//routes/order.tsx
import OrderPage from "@/pages/order";
import type { Route } from "./+types/order";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Order({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><OrderPage data={data} /></>);
}
    
    