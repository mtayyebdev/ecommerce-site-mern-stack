import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetProducts } from '../store/slices/adminSlices/GetProductsSlice.jsx';
import { DeleteProduct } from '../store/slices/adminSlices/DeleteProductsSlice.jsx';
import { SearchProducts } from '../store/slices/productSlices/SearchProductsSlice.jsx';

function Products() {
  const dispatch = useDispatch();
  const [searchTerm, setsearchTerm] = useState("");
  const [AllProducts, setAllProducts] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const { products } = useSelector((state) => state.getadminproducts);

  const deleteProduct = async (id) => {
    await dispatch(DeleteProduct(id))
      .then((res) => {
        if (res.type === "deleteproduct/fulfilled") {
          dispatch(GetProducts())
        }
      })
      .catch((err) => {
        console.log("deleting products error: ", err);
      })
  };

  const searchHandler = async () => {
    if (!searchTerm.length > 0) {
      return seterrorMessage("Enter something in search field.");
    }

    await dispatch(SearchProducts(searchTerm))
      .then((res) => {
        if (res.type === "searchproducts/fulfilled") {
          setAllProducts(res.payload.data);
        }
      })
      .catch((err) => {
        console.log("searching error: ", err);
      })
  };

  useEffect(() => {
    setAllProducts(products && [...products.data].reverse());
  }, [products]);

  const loadAllProducts=()=>{
    setAllProducts(products && [...products.data].reverse());
  }
  

  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className='text-xl font-semibold'>All Products</h2>
        <div className=' w-[7rem] h-0.5 mt-1 bg-blue-600'></div>
      </div>

      <div className="filters">
        <div className="box max-w-md mb-4 mt-4">
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} id="default-search" className="block outline-none w-full py-3 px-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Products by Category & name." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5" onClick={searchHandler}>Search</button>
          </div>
          <p className='text-red-600 mt-1'>{errorMessage}</p>
        </div>
        <div className="flex items-center space-x-4">
        <h2 className='mt-1 font-semibold'>Total Products: {AllProducts&&AllProducts.length}</h2>
        <button className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold" onClick={loadAllProducts}>All Products</button>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Reviews
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {
              AllProducts && AllProducts.map((product, i) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                  <td className="px-6 py-4">
                    <img src={product.gallaryImages[0]} className='w-[40px] h-[40px] rounded' alt="product" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" scope='row'>
                    {product.name.slice(0,40)}...
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    Rs.{product.price}
                  </td>
                  <td className="px-6 py-4">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4">
                    {product.reviews}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/web-admin/update-product/${product._id}`}><i className='fa-solid fa-edit cursor-pointer hover:text-site-color'></i></Link>
                  </td>
                  <td className="px-6 py-4">
                    <i className='fa-solid fa-trash-alt cursor-pointer hover:text-site-color' onClick={() => deleteProduct(product._id)}></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products;