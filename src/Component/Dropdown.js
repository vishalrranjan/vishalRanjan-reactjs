import React, { useEffect, useState } from "react";
import { get } from "../Classes/Request";

const Dropdown = ({ getSelectedValue, style, isRequired }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const data = await get("api/categories");
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);


  return (
    <>
      <select
        name="category"
        className={`rounded border-2 border-gray-700 text-gray-600 pl-3 pr-10 focus:outline-none appearance-none ${style}`}
        required = {isRequired}
        onChange={(e) => getSelectedValue(e)}
      >
        <option>Categories</option>
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default React.memo(Dropdown);
