"use client";
import Button from "@/components/UI/button/Button";
import Input from "@/components/UI/input/Input";
import { getImageCategory } from "@/helpers/getImageCategory";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useCreateProduct } from "../entities/product/page/useCreateProduct";

export const ProductCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Clothes");
  const [discountValue, setDiscountValue] = useState(0);
  const [images, setImages] = useState<string[]>([""]); // массив ссылок

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const { handlerCreateProduct } = useCreateProduct();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handlerCreateProduct({
      title,
      description,
      price,
      images,
      category: getImageCategory(category),
      discount: {
        value: discountValue,
      },
      rating: {
        totalValue: 0,
        voted: 0,
        value: 0,
      },
    });

    setTitle("");
    setDescription("");
    setPrice(0);
    setCategory("Clothes");
    setDiscountValue(0);
    setImages([""]);
  };

  return (
    <div>
      <form
        className="flex flex-col md:text-base text-sm max-w-[460px] m-auto gap-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="name"
          type="text"
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="px-2 py-1 border h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
        />
        <label htmlFor="price">Price</label>
        <Input
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          id="price"
          type="number"
        />

        <label>Images</label>
        {images.map((img, index) => (
          <div key={index} className="relative">
            <Input
              className="w-full"
              key={index}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              type="text"
              placeholder={`Image URL ${index + 1}`}
            />
            <X
              onClick={() => setImages(images.filter((_, i) => i !== index))}
              className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        ))}
        <Button type="button" onClick={addImageField}>
          + Add Image
        </Button>
        <label htmlFor="category">Category</label>
        <select
          className="px-2 py-1 border"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          id="category"
        >
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Shoes">Shoes</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <label htmlFor="discount">Discount</label>
        <Input
          value={discountValue}
          onChange={(e) => setDiscountValue(+e.target.value)}
          id="discount"
          type="number"
        />
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default ProductCreatePage;
