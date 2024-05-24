import Button from "@/components/UI/button/Button";
import Input from "@/components/UI/input/Input";
import { useToast } from "@/hooks/useToast";
import { productApi } from "@/services/product/productApi";
import { IProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FC, useState } from "react";

type IEditorItemProps = {
  product: IProduct;
  setIsEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditorItem: FC<IEditorItemProps> = ({ product, setIsEditor }) => {
  const [productValue, setProductValue] = useState({
    title: product.title,
    description: product.description,
    price: +product.price,
    discountValue: product.discount?.value,
  });

  const changeProductValue: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setProductValue((productValue) => ({ ...productValue, [e.target.name]: e.target.value }));
  };

  const onSaveChangesProduct: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { discountValue, ...preparedProductValues } = productValue;
    const chandedProduct = {
      ...preparedProductValues,
      id: product.id,
      category: product.category,
      images: product.images,
      rating: product.rating,
      discount: { value: productValue.discountValue || 0 },
    };
    mutation.mutate(chandedProduct);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["products", `categoryID:${product.category.id}`, product.id],
    mutationFn: (product: IProduct) => productApi.changeProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", `categoryID:${product.category.id}`] });
      setIsEditor(false);
      useToast.productChanged();
    },
  });

  return (
    <>
      <form onSubmit={(e) => onSaveChangesProduct(e)} className="text-lg  flex flex-col  w-full">
        <label htmlFor="title">Title: </label>
        <div>
          <Input
            onChange={changeProductValue}
            name="title"
            className="w-full"
            required
            type="text"
            value={productValue.title}
          />
        </div>
        <label htmlFor="description">Description: </label>
        <div className="flex">
          <textarea
            onChange={changeProductValue}
            name="description"
            value={productValue.description}
            className="resize-none h-[110px] w-full px-2 py-1 border"
          ></textarea>
        </div>
        <label htmlFor="price">Price: </label>
        <div>
          <Input
            onChange={changeProductValue}
            name="price"
            required
            type="number"
            min={1}
            value={productValue.price}
          />
          {"$"}
        </div>
        <label htmlFor="discountValue">Discount: </label>
        <div>
          <Input
            onChange={changeProductValue}
            name="discountValue"
            type="number"
            max={90}
            min={0}
            value={productValue.discountValue}
          />
          {"%"}
        </div>
        <Button className="mt-6 md:max-w-[250px]">Save</Button>
      </form>
    </>
  );
};

export default EditorItem;
