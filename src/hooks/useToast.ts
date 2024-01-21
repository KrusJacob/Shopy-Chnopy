import toast from "react-hot-toast";
export const useToast = {
  addProductToCart: (productTitle: string = "product") =>
    toast.success(`The ${productTitle} has been added to cart`),

  productChanged: () => toast.success("The product has been changed"),

  removeProductFromCart: (productTitle: string = "product") =>
    toast.success(`The ${productTitle} has been removed from cart`),

  voteRateProduct: (productTitle: string = "product", star: number) =>
    toast.success(`you rated the ${productTitle} ${star} stars, thanks`),

  loginIn: () => {
    toast.success("login success");
  },
  logOff: () => {
    toast.success("logoff success");
  },
};
