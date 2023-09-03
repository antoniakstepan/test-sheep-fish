import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../features/product/productSlice";
import { fetchCategories } from "../../features/categories/categorySlice";

import { AppDispatch, RootState } from "../../app/store";
// Components
import EditForm from "../ProductForm";
import CreateProduct from "../CreateProduct";

// Material
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rodal from "rodal";

// type
import { Product } from "../../features/product/productSlice";

//Css Rodal
import "rodal/lib/rodal.css";
const customStyles = {
  height: "auto",
  bottom: "auto",
  top: "30%",
};

const Home = () => {
  // State
  const [selectProduct, setSelectProduct] = useState<Product | null>(null);
  const [selectProductId, setSelectProductId] = useState<number | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  // Filter State
  const [titleFilterInput, setTitleFilterInput] = useState<string>("");
  const [descriptionFilterInput, setDescriptionFilterInput] = useState<string>("");
  const [categoryFilterInput, setCategoryFilterInput] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error, products } = useSelector(
    (state: RootState) => state.products
  );
  const { status: categoryStatus, category } = useSelector(
    (state: RootState) => state.category
  );

  const productsData = useMemo(() => {
    const titleFiltered: Product[] | [] = titleFilterInput ? products?.filter(product => product.title?.includes(titleFilterInput)): products;

    const descriptionFiltered: Product[] | [] = descriptionFilterInput ? titleFiltered?.filter(product => product.description?.includes(descriptionFilterInput)) : titleFiltered;

    const categoryFiltered: Product[] | [] = categoryFilterInput ? descriptionFiltered?.filter(product => product.category === categoryFilterInput) : descriptionFiltered;

    return categoryFiltered

  }, [products, titleFilterInput, descriptionFilterInput, categoryFilterInput])

  // Handlers
  const onCloseEditModal = () => {
    setSelectProduct(null);
  };

  const onCloseDeleteModal = () => {
    setSelectProductId(null);
  };

  const onCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const deleteProductHandler = (id: number) => {
      fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then( () => {
        dispatch(deleteProduct(id))
        onCloseDeleteModal()
      });
            
     

  }

  const resetFilter = () => {
    setTitleFilterInput("");
    setDescriptionFilterInput("");
    setCategoryFilterInput(null);
  };

  useEffect(() => {
    if (status === "idle") {
      // Dispatch the async thunk when the component mounts
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (categoryStatus === "idle") {
      // Dispatch the async thunk when the component mounts
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="w-full min-h-[calc(100vh_-_64px)] flex justify-center items-center"><CircularProgress /></div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <CreateProduct open={isOpenCreateModal} handleClose={onCloseCreateModal} />
      <Rodal
        visible={!!selectProduct}
        onClose={onCloseEditModal}
        customStyles={customStyles}
      >
        <div className="p">
          <h3> Edit {selectProduct?.id}</h3>
          {selectProduct && <EditForm product={selectProduct} />}
        </div>
      </Rodal>
      <Dialog open={!!selectProductId} onClose={onCloseDeleteModal}>
        <div className="w-[300px] p-[12px]">
          <h3 className="text-center">Do you remove product {selectProductId}</h3>
          <div className="flex justify-center items-center gap-x-[8px] pt-[12px]">
            <Button onClick={() => {typeof selectProductId === 'number' && deleteProductHandler(selectProductId)}} color="primary" variant="contained">Delete</Button>
            <Button onClick={onCloseDeleteModal} color="secondary" variant="outlined">Cancel</Button>
          </div>
        </div>
      </Dialog>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products from dummyJSON.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {setIsOpenCreateModal(true)}}
          >
            Add Product
          </button>
        </div>
      </div>
      {products?.length && (
        <div>
          <h2 className="text-lg pt-[10px]">Product Filters</h2>
          <div className="flex flex-wrap gap-[8px] pt-[12px]"> 
            <TextField size="small" value={titleFilterInput || ""} onChange={(e) => setTitleFilterInput(e.target.value)} label="Title" />
            <TextField size="small" value={descriptionFilterInput || ""} onChange={(e) => setDescriptionFilterInput(e.target.value)} label="Description" />
            <Autocomplete
                value={categoryFilterInput}
                onChange={(e, v) => {
                   setCategoryFilterInput(v)
                  }}
                options={category?.length ? category : []}
                getOptionLabel={(o) => `${o}` || ""}
                renderInput={(p) => (
                  <TextField
                    {...p}
                    variant="outlined"
                    fullWidth
                    label="Category"
                    style={{ minWidth: 195 }}
                    size="small"
                  />
                )}
              />
              <Button 
                variant="outlined" 
                color="primary"
                onClick={resetFilter}
                disabled={!titleFilterInput && !descriptionFilterInput && !categoryFilterInput}
              >
                Reset Filter
              </Button>
          </div>
        </div>
      )}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {productsData?.length ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[300px]"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productsData.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {product.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.title}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 max-w-[300px]">
                          {product.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.images?.[0] ?<img
                            className="w-[24px] h-[24px]"
                            src={product.images?.[0]}
                            alt={`Image ${product.id}`}
                          /> : "No image"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.rating}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.stock}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex items-center gap-x-[8px]">
                          <div
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => setSelectProduct(product)}
                          >
                            Edit<span className="sr-only"></span>
                          </div>
                          <div
                            className="text-rose-600 hover:text-rose-900 hover:border-rose-900 text-md border border-rose-600 px-1 cursor-pointer"
                            onClick={() => setSelectProductId(product?.id)}
                          >
                            X<span className="sr-only"></span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>No products</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
