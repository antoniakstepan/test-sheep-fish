import React, { useEffect } from "react";
import * as Yup from "yup";
import { compact } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchCategories } from "../features/categories/categorySlice";
import { editProduct, addProduct } from "../features/product/productSlice";
import { Product } from "../features/product/productSlice";
// Formik
import { Formik, Form, Field, FormikProps } from "formik";
// Material
import { TextField, Autocomplete, Button } from "@mui/material";
type EditFormType = {
  product?: Product;
  onClose?: any;
};

const EditForm = ({ product, onClose }: EditFormType) => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, category } = useSelector(
    (state: RootState) => state.category
  );
  interface ProductEdit {
    title: string | null;
    description: string | null;
    category: string;
    price: number | null;
    rating: number | null;
  }
  const initialValues: ProductEdit = {
    title: product?.title || null,
    description: product?.description || null,
    category: product?.category || "",
    price: product?.price || null,
    rating: product?.rating || null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    rating: Yup.number()
      .typeError("Rating must be a number")
      .required("Rating is required"),
  });

  useEffect(() => {
    if (status === "idle") {
      // Dispatch the async thunk when the component mounts
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const body: Product = {
          id: product?.id || 0,
          title: values.title || "",
          description: values.description || "",
          price: values.price || 0,
          discountPercentage: product?.discountPercentage || 0,
          rating: values.rating || 0,
          stock: product?.stock || 0,
          brand: product?.brand || "",
          category: values.category,
          thumbnail: product?.thumbnail || "",
          images: product?.images || [],
        };

        const { id, ...rest } = body;
        if (product?.id) {
          fetch(`https://dummyjson.com/products/${product.id}`, {
            method: "PUT" /* or PATCH */,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then(() => dispatch(editProduct(body)));
          setSubmitting(false);
        } else {
          fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rest),
          })
            .then((res) => res.json())
            .then((res) => {
              resetForm();
              dispatch(addProduct({ id: res?.id, ...rest }));
              onClose && onClose();
            });
          setSubmitting(false);
        }
      }}
    >
      {(props: FormikProps<any>) => {
        const { errors } = props;
        const hasErrors =
        compact(Object.keys(props.errors).map((k) => (errors[k] ? true : null)))
          .length > 0;

        return (
          <Form className="pt-[16px] flex flex-col gap-y-[12px]">
            <div>
              <Field name="title">
                {({ field, form }: any) => {
                  return (
                    <TextField
                      fullWidth
                      value={field.value}
                      onChange={(e) => {
                        form.setFieldValue("title", e.target.value);
                      }}
                      label="Title"
                      size="small"
                    />
                  );
                }}
              </Field>
              {errors.title && <div className="text-rose-600 pl-[12px]">
                {`${errors.title}`}
              </div>}
            </div>
            <div>
              <Field name="description">
                {({ field, form }: any) => {
                  return (
                    <TextField
                      fullWidth
                      value={field.value}
                      minRows={2}
                      multiline
                      onChange={(e) => {
                        form.setFieldValue("description", e.target.value);
                      }}
                      label="Description"
                    />
                  );
                }}
              </Field>
              {errors.description && <div className="text-rose-600 pl-[12px]">
                {`${errors.description}`}
              </div>}
            </div>
            <div>
              <Field name="category">
                {({ field, form }: any) => {
                  return (
                    <Autocomplete
                      fullWidth
                      value={field.value}
                      onChange={(e, v) => {
                        form.setFieldValue("category", v);
                      }}
                      options={category?.length ? category : []}
                      getOptionLabel={(o) => `${o}` || ""}
                      renderInput={(p) => (
                        <TextField
                          {...p}
                          variant="outlined"
                          fullWidth
                          label="Category"
                          style={{ minWidth: 100 }}
                          size="small"
                        />
                      )}
                    />
                  );
                }}
              </Field>
              {errors.category && <div className="text-rose-600 pl-[12px]">
                {`${errors.category}`}
              </div>}        
            </div>
            <div className="flex gap-x-[8px]">
              <div>
                <Field name="price" id="price">
                  {({ field, form }: any) => {
                    return (
                      <TextField
                        fullWidth
                        value={field.value}
                        type="number"
                        size="small"
                        onChange={(e) => {
                          form.setFieldValue("price", e.target.value);
                        }}
                        label="Price"
                        inputProps={{ min: 0 }}
                      />
                    );
                  }}
                </Field>
                {errors.price && <div className="text-rose-600 pl-[12px]">
                {`${errors.price}`}
              </div>}  
              </div>
              <div>
                <Field name="rating" id="rating">
                  {({ field, form }: any) => {
                    return (
                      <TextField
                        fullWidth
                        value={field.value}
                        type="number"
                        size="small"
                        onChange={(e) => {
                          form.setFieldValue("rating", e.target.value);
                        }}
                        label="Rating"
                        inputProps={{ min: 0 }}
                      />
                    );
                  }}
                </Field>
                {errors.rating && <div className="text-rose-600 pl-[12px]">
                {`${errors.rating}`}
              </div>}             
              </div>
            </div>
            <div className="flex justify-center pt-[12px]">
              <Button
                color="primary"
                variant="contained"
                onClick={props.submitForm}
                disabled={props.isSubmitting || hasErrors || !props.values?.title}
              >
                {product?.id ? "Save" : "Create"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditForm;
