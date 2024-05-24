import React, { useState } from "react";
import { IProduct } from "@/types/product.type";
import Button from "@/components/UI/button/Button";
import { Settings } from "lucide-react";
import ProductItemBody from "./ProductItemBody";
import ProductInfo from "./ProductInfo";
import EditorItem from "./EditorItem";

interface Props {
  product: IProduct;
}

const AdminItem = ({ product }: Props) => {
  const [isEditor, setIsEditor] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <ProductItemBody product={product} />
        {isEditor ? <EditorItem product={product} setIsEditor={setIsEditor} /> : <ProductInfo product={product} />}
      </div>
      <Button onClick={() => setIsEditor(!isEditor)} Icon={Settings}>
        {isEditor ? "Back" : "Change"}
      </Button>
    </>
  );
};

export default AdminItem;
