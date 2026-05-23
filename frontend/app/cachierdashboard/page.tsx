"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CashierPage() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    const res = await axios.get(
      "http://localhost:8080/api/products"
    );

    setProducts(res.data);
  };

  const searchProducts = async () => {

    const res = await axios.get(
      `http://localhost:8080/api/products/search?keyword=${search}`
    );

    setProducts(res.data);
  };

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">
        Cashier Dashboard
      </h1>

      <div className="flex gap-2 mb-5">

        <input
          type="text"
          placeholder="Search Product"
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={searchProducts}
          className="bg-blue-500 text-white px-4"
        >
          Search
        </button>

      </div>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product: any) => (

            <tr key={product.id}>

              <td>{product.productName}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.stockQuantity}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}