//routes/test.tsx
import TestPage from "@/pages/test";
import type { Route } from "./+types/test";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function Test({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><TestPage data={data} /></>);
}
    
    