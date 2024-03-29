import Button from "@/components/UI/button/Button";
import { getDifferencePrice } from "@/hooks/usePriceWithDiscount";
import { IProduct } from "@/types/product.type";
import { Wallet2, XSquare } from "lucide-react";

interface IProdictCart extends IProduct {
  quantity?: number;
  selected?: boolean;
}

const PaymentModal = ({
  setIsShowModal,
  totalPrice,
  mergeProductCarts,
}: {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  mergeProductCarts: IProdictCart[];
}) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center ">
      <div className="max-w-[500px] w-[500px] border-2 border-redLight bg-slate-200 p-8 relative flex flex-col justify-center rounded">
        <div className="my-5">
          <div className="text-xl my-2">
            {mergeProductCarts.map((item) => (
              <div className="border-dotted border-black border-b" key={item.id}>
                <div className="flex justify-between">
                  <p>
                    {item.title} x {item.quantity || 1}
                  </p>
                  <p>- {item.price * (item.quantity || 1)} $</p>
                </div>
                {item.discount && item.discount.value > 0 && (
                  <div>
                    <div className="flex justify-between">
                      <p>discount:</p>
                      <p>
                        + {` ${getDifferencePrice(item.price, item.discount.value)} $ (${item.discount.value}%)`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <br />
          <div className="text-2xl flex justify-between">
            <p>Total price:</p>
            <span className="font-medium">{totalPrice}$</span>{" "}
          </div>
        </div>

        <Button Icon={Wallet2} onClick={() => setIsShowModal(false)} className="text-xl disabled:opacity-50">
          Buy
        </Button>

        <XSquare
          className="absolute top-0 right-0 cursor-pointer"
          size={30}
          onClick={() => setIsShowModal(false)}
        />
      </div>
    </div>
  );
};

export default PaymentModal;
