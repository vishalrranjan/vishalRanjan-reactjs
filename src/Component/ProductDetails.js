import React, { useEffect, useState } from "react";
import { get } from "../Classes/Request";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();

  const { id } = useParams();

  const getProductDetails = async () => {
    const response = await get(`api/products/${id}`);
    setProduct(response.product);
  };

  useEffect(() => {
    getProductDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-9/12 h-9/12 border-0 overflow-hidden rounded-xl">
        {product ? (
          <div className="grid grid-cols-2 gap-2 bg-slate-200">
            <div className="flex justify-center items-center py-4">
              <img
                className="w-96 h-96"
                src={product.avatar}
                alt="product"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
            <div className="flex flex-col justify-center pr-4">
              <p className="tracking-wide border-b border-orange-300 font-sans text-4xl py-2 font-medium">
                {product.name}
              </p>
              <p className="py-4 lining-nums text-slate-400">
                $ {product.price}
              </p>
              <p className="text-slate-500 font-medium">Description -</p>
              <p className="text-clip overflow-hidden text-slate-600">
                {product.description}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-center p-4 text-orange-600 text-5xl subpixel-antialiased align-middle lining-nums">
                <span className="text-2xl">$</span>
                {product.price}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white text-center text-3xl border-none py-4">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
