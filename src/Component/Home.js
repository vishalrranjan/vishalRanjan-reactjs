import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../Classes/Request";
import Dropdown from "./Dropdown";
import LoadingTex from "./LoadingTex";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const data = await get("api/products");
    setProductList(data.products.reverse());
  };

//   const getIndividualCategories = async (id) => {
//       const data = await get(`api/categories/${id}`);
//       console.log(data);
//   }

  const handleProduct = (id) => {
    window.open(`/product/${id}`, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getData();
    // getIndividualCategories("62e638f41126b53e1c7deb61")
  }, []);

  return (
    <div className="mx-14 mb-14  flex flex-col overscroll-contain ">
      <nav className="w-full h-24 border-b border-orange-600 m-4 flex justify-center items-center">
        <p className="text-5xl text-orange-600">UPayments</p>
      </nav>
      <div className="flex flex-row justify-around my-6">
        <input
          type="text"
          className="rounded pl-3 w-64 h-10 border-0 outline-none"
          placeholder="Type product name"
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Dropdown style={`w-64`} />
      </div>
      <div className="flex flex-wrap">
        {productList.length > 0 ? (
          productList.filter((product) => product.name.toLowerCase().includes(searchWord.toLowerCase())).slice(0, 10).map((product) => {
            return (
              <div
              key={product._id}
                onClick={() => handleProduct(product._id)}
                className="rounded-bl-2xl rounded-tr-2xl flex flex-col bg-slate-500 shadow-md hover:shadow-xl shadow-slate-300/50 justify-between items-center m-3 p-3 cursor-pointer w-80 h-64"
              >
                <div className="bg-slate-100 rounded-full overflow-hidden h-36 w-44 flex justify-center items-center">
                  <img
                    title={`${product.name}`}
                    className="object-contain h-28 w-36 hover:scale-90 transition "
                    src={product.avatar}
                    alt="product"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="w-60">
                  <h5
                    title={`${product.name}`}
                    className="font-serif text-center truncate text-lg subpixel-antialiased tracking-wide leading-relaxed text-white"
                  >
                    {product.name}
                  </h5>
                  <p className="font-mono text-xl text-center antialiased font-semibold lining-nums text-orange-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
            <LoadingTex />
        )}
      </div>

      <button
        onClick={() => navigate("/create-product")}
        className="text-5xl text-white border rounded-full w-20 h-20 fixed bottom-8 right-4 bg-white font-semibold"
      >
        <span className="text-slate-600">+</span>
      </button>
    </div>
  );
};

export default React.memo(Home);
