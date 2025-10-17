// app/types.d.ts

// types.ts  不要写 export interface User，否则它就变成模块，必须手动导入。
interface Product {
  id: string;
  name: string;
  image: string;
  points: number;
  price: number;
  monthly: string;
  tags?: string[];
}