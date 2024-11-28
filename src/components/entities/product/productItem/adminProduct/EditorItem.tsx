import Button from "@/components/UI/button/Button";
import Input from "@/components/UI/input/Input";
import { IProduct } from "@/types/product.type";
import React, { FC, useState } from "react";
import useEditProduct from "./useEditProduct";

type IEditorItemProps = {
  product: IProduct;
  setIsEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface StateProps {
  title: string;
  description: string;
  price: number;
  discountValue: number;
}
const EditorItem: FC<IEditorItemProps> = ({ product, setIsEditor }) => {
  const [productValue, setProductValue] = useState<StateProps>({
    title: product.title,
    description: product.description,
    price: +product.price,
    discountValue: +product.discount.value,
  });

  const changeProductValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setProductValue((productValue) => ({
      ...productValue,
      [e.target.name]: e.target.value,
    }));
  };

  const { handlerSaveProduct, isPending } = useEditProduct(setIsEditor);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlerSaveProduct(product, productValue);
        }}
        className="text-base  flex flex-col  w-full"
      >
        <div>
          <label htmlFor="title">Title: </label>
          <Input
            onChange={changeProductValue}
            name="title"
            className="w-full"
            required
            type="text"
            value={productValue.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            onChange={changeProductValue}
            name="description"
            value={productValue.description}
            className="resize-none h-[110px] w-full px-2 py-1 border"
          />
        </div>
        <div className="flex gap-6">
          <div>
            <label htmlFor="price">Price: </label>
            <Input
              onChange={changeProductValue}
              name="price"
              required
              type="number"
              min={1}
              max={9999}
              value={productValue.price}
            />
            {"$"}
          </div>
          <div>
            <label htmlFor="discountValue">Discount: </label>
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
        </div>

        <Button isLoading={isPending} className="mt-6 md:max-w-[250px]">
          Save
        </Button>
      </form>
    </>
  );
};

export default EditorItem;
