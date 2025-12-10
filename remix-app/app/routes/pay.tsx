//routes/pay.tsx
import PayPage from "@/pages/pay";
import type { Route } from "./+types/pay";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Pay({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><PayPage data={data} /></>);
}
    
    