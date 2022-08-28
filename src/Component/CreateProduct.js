import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../Classes/Request";
import Dropdown from "./Dropdown";
import LoaderButton from "./LoaderButton";

const CreateProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    avatar: "",
    developerEmail: "vishalkr275@gmail.com",
  });

  const [isSumbmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const getProductDetails = (e) => {
    const { name, value } = e.target;
    const copiedProductDetails = {
      ...productDetails,
      [name]: value,
    };
    setProductDetails(copiedProductDetails);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const request = await post("api/products", productDetails);
    const response = await request.data;
    response.message === "Success" && navigate("/")
  };


  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-1/2 border-0 overflow-hidden rounded">
        <form className="flex flex-col" onSubmit={(e) => submitProduct(e)}>
          <input
            type="text"
            name="name"
            className="col-span-2 w-full h-10 my-2 pl-3 bg-slate-200 border-0 overflow-hidden rounded-xl outline-none"
            placeholder="Product Name"
            onChange={(e) => getProductDetails(e)}
            required
          />
          <textarea
            type="text"
            name="description"
            rows="4"
            className="col-span-2 w-full p-3 my-2 bg-slate-200 border-0 overflow-hidden rounded-xl outline-none"
            placeholder="Description"
            onChange={(e) => getProductDetails(e)}
            required
          />
          <input
            type="text"
            name="avatar"
            className="col-span-2 w-full h-10 my-2 pl-3 bg-slate-200 border-0 overflow-hidden rounded-xl outline-none"
            placeholder="Image URL"
            onChange={(e) => getProductDetails(e)}
            required
          />
          <Dropdown
            getSelectedValue={getProductDetails}
            style={`col-span-2 w-full h-10 my-2 pl-3 bg-slate-200 border-0 rounded-xl`}
            isRequired={true}
          />
          <input
            type="number"
            name="price"
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onWheel={(e) => e.target.blur()}
            className="col-span-2 w-full h-10 my-2 pl-3 bg-slate-200 border-0 overflow-hidden rounded-xl outline-none appearance-none"
            placeholder="Price"
            onChange={(e) => getProductDetails(e)}
            required
          />
          {isSumbmit ? (
            <LoaderButton />
          ) : (
            <input
              type="submit"
              className="col-span-2 w-full h-10 mt-5 pl-3 bg-indigo-400 border-0 rounded-xl outline-none cursor-pointer text-white hover:text-orange-600 font-medium text-xl"
              value="Submit"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
