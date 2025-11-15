import React, { createContext } from 'react';

interface ProductContextType {
    productId: number;
    productData: ProductType;
    productDataInit: ProductType;
    setProductData: React.Dispatch<React.SetStateAction<ProductType>>; // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export const ProductContext = createContext<ProductContextType | null>(null);
