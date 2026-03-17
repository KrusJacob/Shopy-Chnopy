import React, { useState } from "react";
import { IProduct } from "@/types/product.type";
import Button from "@/components/UI/button/Button";
import { Settings } from "lucide-react";
import ProductImage from "../ProductImage";
import ProductInfo from "../ProductInfo";
import EditorItem from "./EditorItem";

interface Props {
  product: IProduct;
}

const AdminItem = ({ product }: Props) => {
  const [isEditor, setIsEditor] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 w-full ">
        <ProductImage product={product} />
        {isEditor ? (
          <EditorItem product={product} setIsEditor={setIsEditor} />
        ) : (
          <ProductInfo product={product} />
        )}
        <div className="p-4">
          <Button onClick={() => setIsEditor(!isEditor)} Icon={Settings}>
            {isEditor ? "Back" : "Change"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminItem;
