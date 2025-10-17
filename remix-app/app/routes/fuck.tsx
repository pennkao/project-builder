//routes/fuck.tsx
import FuckPage from "@/pages/fuck";
import type { Route } from "./+types/fuck";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Fuck({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><FuckPage data={data} /></>);
}
    
    