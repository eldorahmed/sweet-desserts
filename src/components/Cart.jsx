import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder } from "../features/dessertSlise";
import CartBg from "../../public/assets/images/illustration-empty-cart.svg";

import { TiDeleteOutline } from "react-icons/ti";
import Modal from "./Modal";

const Cart = () => {
  const [oppen, setOppen] = useState(false);
  const dispatch = useDispatch();
  const { ordered, orderTotal, priceTotal } = useSelector(
    (state) => state.orders
  );
  const handleOppen = () => {
    setOppen(!oppen);
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteOrder(id));
  };

  return (
    <div className="bg-white relative rounded-2xl lg:w-1/3 p-6 h-full">
      <h1 className="text-4xl w-full mb-5 text-[#C73B0F] font-bold">
        Your Cart ({orderTotal})
        {!orderTotal && (
          <div className="flex flex-col justify-center items-center">
            <img className="w-48 " src={CartBg} alt="" />
            <p className="text-[15px]">Your added items will appear here</p>
          </div>
        )}
      </h1>
      {ordered?.map((order) => {
        return (
          <div
            key={order.id}
            className="flex items-center justify-between mb-3"
          >
            <div>
              <h2>{order.name}</h2>
              <p>
                {order.amount}x <span>@{order.price.toFixed(2)}$</span>
                <span>${(order.amount * order.price).toFixed(2)}</span>
              </p>
            </div>
            <button type="button" onClick={() => handleDelete(order.id)}>
              <TiDeleteOutline className="w-7 h-7" />
            </button>
            {oppen && <Modal handleOppen={handleOppen} />}
          </div>
        );
      })}
      <div className="mb-10">
        <h3 className="flex justify-between items-center mt-5">
          <span className="font-semibold">Order Total:</span>{" "}
          <span className="font-bold text-2xl ">${priceTotal.toFixed(2)} </span>
        </h3>
      </div>
      <button
        onClick={handleOppen}
        className="group block w-full rounded-full  bg-[#C73B0F] text-white hover:opacity-80 "
        href="#"
      >
        <span className="block text-center rounded-full px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          Confirm Order
        </span>
      </button>
    </div>
  );
};

export default Cart;
