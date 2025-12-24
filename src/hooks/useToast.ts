import toast from "react-hot-toast";
export const useToast = {
  addProductToCart: (productTitle: string = "product") =>
    toast.success(`The ${productTitle} has been added to cart`),

  productChanged: () => toast.success("The product has been changed"),
  productCreated: () => toast.success("The product has been created"),
  productDeleted: () => toast.success("The product has been deleted"),

  removeProductFromCart: (productTitle: string = "product") =>
    toast.success(`The ${productTitle} has been removed from cart`),

  voteRateProduct: (productTitle: string = "product") =>
    toast.success(`you rated the ${productTitle}, thanks`),

  loginIn: () => {
    toast.success("login success");
  },
  logOff: () => {
    toast.success("logoff success");
  },
  successRegister: () => toast.success("Register success"),
  errorRegister: () => toast.error("Register error"),
  error: () => {
    toast.error("There was an error");
  },
};
