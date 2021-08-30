import { createContext, useContext } from "react";

export interface ICartItem {
  _id: string;
  sku: string;
  quantity: number;
  color: string;
  size: string;
}

export interface ICartState {
  cart: ICartItem[];
  addToCart: (data: ICartItem) => void;
  checkExistedItem: (data: ICartItem) => boolean;
  increaseItemQuantity: (data: ICartItem) => void;
}

const CartContext = createContext<ICartState>({} as ICartState);
let state: ICartState = {
  cart: [],
  addToCart(data) {
    const isExist = this.checkExistedItem(data);

    if (isExist) {
      this.increaseItemQuantity(data);
      return;
    }

    this.cart.push(data);
  },
  checkExistedItem(data) {
    return Boolean(
      this.cart.find(
        (x) =>
          x._id === data._id && x.size === data.size && x.color === data.color
      )
    );
  },
  increaseItemQuantity(data) {
    const idx = this.cart.findIndex(
      (x) =>
        x._id === data._id && x.size === data.size && x.color === data.color
    );
    const newData = {
      ...this.cart[idx],
      quantity: Number(this.cart[idx].quantity) + Number(data.quantity),
    };

    this.cart.splice(idx, 1);
    this.cart.push(newData);
  },
};

export const CartProvider = ({ children }: { children: any }) => {
  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
