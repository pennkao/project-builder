//routes/home.tsx
import HomePage from "@/pages/home";
import type { Route } from "./+types/home";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><HomePage data={data} /></>);
}
    
    