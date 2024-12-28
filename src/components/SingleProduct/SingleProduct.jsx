import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

export default function SingleProduct({ Product }) {
  let { title, price, category, imageCover, ratingsAverage, brand, id, _id } =
    Product;

  let { addProductToCart } = useContext(cartContext);
  let { addWish, wishList } = useContext(wishListContext);

  const [IsFav, setIsFav] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAddToCart(productId) {
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      });
    } else {
      toast.error(response.data.message, {
        style: {
          color: "white",
          fontWeight: "700",
        },
      });
    }
    setLoading(false);
  }
  async function handelAddWish(productId) {
    let response = await addWish(productId);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      });
    } else {
      toast.error(response.data.message, {
        style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      });
    }
  }

  function checkWishId(id) {
    wishList?.data?.map((item) => {
      if (item._id == id) {
        setIsFav(true);
      }
    });
  }

  useEffect(() => {
    checkWishId(id);
  }, [id]);

  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 shadow-md rounded-lg p-2 hover:shadow-xl ">
      <div className="upper relative overflow-hidden">
        <img src={imageCover} alt={title} className="w-full" />

        <div className="layer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-4">
          <div
            onClick={() => handleAddToCart(id)}
            className="icon translate-y-full opacity-0  group-hover:translate-y-0 duration-500 group-hover:opacity-100  bg-primary text-white rounded-full size-12 flex justify-center items-center hover:bg-darkPrimary"
          >
            {loading ? (
              <i className="fas fa-spin fa-spinner text-xl"></i>
            ) : (
              <i className="fa-solid fa-cart-shopping text-2xl cursor-pointer "></i>
            )}
          </div>
          <Link to={`/productDetails/${id}/${category.name}`}>
            <div className="icon translate-y-full opacity-0 group-hover:translate-y-0 duration-500 delay-200 group-hover:opacity-100 bg-primary text-white rounded-full size-12 flex justify-center items-center hover:bg-darkPrimary">
              <i className="fa-solid fa-eye text-2xl cursor-pointer"></i>
            </div>
          </Link>
        </div>
      </div>

      <div className="lower flex flex-wrap flex-col text-start bg-white">
        <div className="flex justify-between">
          <div>
            <h3>{title.split(" ").slice(0, 2).join(" ")}</h3>

            <p>{category.name}</p>
            <p>{brand.name}</p>
          </div>
          <div className="heart-icon" onClick={() => setIsClick(!isClick)}>
            {isClick || IsFav ? (
              <i
                className="fa-solid fa-heart text-3xl text-red-500 cursor-pointer
          "
              ></i>
            ) : (
              <i
                onClick={() => handelAddWish(id)}
                className="fa-solid fa-heart text-3xl text-gray-500 cursor-pointer
          "
              ></i>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mt-4">
          <p>{price} EGP</p>
          <p>
            {ratingsAverage} <i className="fa-solid fa-star text-rating"></i>
          </p>
        </div>
      </div>
    </div>
  );
}
