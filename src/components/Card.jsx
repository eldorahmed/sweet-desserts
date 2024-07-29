
import { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { incrementOrder, decrementOrder } from "../features/dessertSlise";

function Card({ dessert }) {
  const [addButtons, setAddButtons] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dessert.amount === 0) {
      setAddButtons(false);
    }
  }, [dessert.amount]);
  return (
    <div className="block rounded-lg   mb-7">
      <div className="relative mb-10">
        <img
          alt=""
          src={dessert.image.mobile}
          className="h-56 w-full rounded-md object-cover"
        />
        <div className=" hover:shadow-md active:shadow-none  bottom-[-25px] left-20  rounded-[25px] bg-white border border-[#AD8A85] absolute">
          {!addButtons && (
            <button
              onClick={() => {
                setAddButtons(true);
                dispatch(incrementOrder(dessert.id));
              }}
              type="button"
              className="flex items-center gap-2 py-3 px-7"
            >
              <span className="text-[#C73B0F]">
                <MdOutlineAddShoppingCart />
              </span>
              <h2>Add to Cart</h2>
            </button>
          )
        }
          {addButtons && (
            <div className="flex gap-10 py-3 px-3 rounded-[25px] duration-300 bg-[#C73B0F] items-center justify-center w-40">
             <button onClick={() => dispatch(decrementOrder(dessert.id))}>
                <AiFillMinusCircle className="w-6 h-6 text-white" />
              </button>
              <span className="text-white">{dessert.amount} </span>
              
              <button onClick={() => dispatch(incrementOrder(dessert.id))}>
                <AiFillPlusCircle className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2">
        <div>
          <div>
            <p className="sr-only">Price</p>

            <p className="text-sm text-[#87635A] mb-2">{dessert.category}</p>
          </div>

          <div>
            <dd className="font-medium ">{dessert.name}</dd>
            <p className="text-[#C73B0F]">${dessert.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
