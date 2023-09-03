import React from 'react';
import Rodal from "rodal";
// Components
import ProductForm from "../ProductForm";
const customStyles = {
  height: "auto",
  bottom: "auto",
  top: "30%",
};

type CreateProductType = {
  open: boolean;
  handleClose: any;
}
const CreateProduct = ({open, handleClose}: CreateProductType) => {
  return (
    <Rodal visible={open} onClose={handleClose} customStyles={customStyles}>
      <div className="p">
        <h3> Create Product </h3>
        <ProductForm onClose={handleClose}  />
      </div>
    </Rodal>
  )
}

export default CreateProduct;
