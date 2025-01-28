import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleOrder } from '../../store/slices/orderSlices/GetSingleOrderSlice.jsx'
import { CancelOrder } from '../../store/slices/orderSlices/CancelOrderSlice.jsx'

function OrderDetails() {
    const { id } = useParams();
    const order = useSelector((state) => state.getsingleorder.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetSingleOrder(id));
    }, [id]);

    const cancelOrderHandler = async () => {
        await dispatch(CancelOrder(id))
            .then((res) => {
                if (res.type === 'cancelorder/fulfilled') {
                    dispatch(GetSingleOrder(id));
                }
            })
    }

    return (
        <>
            <div className="w-full mt-3">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

                <div className="w-full bg-white text-black">
                    <div className="flex flex-row items-center justify-between border-b px-6 py-3">
                        <h2 className="font-semibold">{order && order.username}</h2>
                        <div className="flex flex-row items-center gap-2">
                            {order && order.status != "Cancelled" && order.paymentType == "None" ? <Link to={`/payment/${order && order._id}`}>
                                <button className="bg-[rgb(236,240,247)] py-0.5 px-3 rounded-full hover:bg-site-color hover:text-white">Menage Payment</button>
                            </Link> : ""}
                            {order && order.status != "Cancelled" ?
                                <button className="bg-[rgb(255,39,39)] py-0.5 px-3 rounded-full hover:bg-red-600 text-white" onClick={cancelOrderHandler}>Cancel Order</button>
                                : ""}
                            <h2 className="bg-[rgb(236,240,247)] py-0.5 px-3 rounded-full">
                                {order && order.status}
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between md:flex-row p-6 w-full">
                        <div className="flex items-start space-x-4 w-full md:w-3/4">
                            <div className="overflow-hidden">
                                <img
                                    src={order && order.image}
                                    alt="Product Image"
                                    className="w-[100px] h-[100px]"
                                />
                            </div>
                            <div className="w-1/2">
                                <h2 className="text-sm">
                                    {order && order.name}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Return: <span className="font-medium">{order && order.returns}</span>
                                </p>
                                <p className="text-xs mt-1">{order && order.status}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Rs. {order && order.price}</p>
                            </div>
                        </div>
                        <div className="text-right w-full mt-3 md:mt-0 md:w-1/4 flex items-start">
                            <p className="text-sm text-gray-500">Qty: {order && order.quantity}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white text-black w-full py-2 pb-4 mt-4 px-3">
                    <div className="order flex gap-1 items-center text-sm">
                        <p>Order</p>
                        <p>{order && order.orderId}</p>
                    </div>
                    <div className="time flex gap-1 items-center text-xs mt-0.5 text-gray-500">
                        <p>Placed On</p>
                        <p>{order && order.deliveryDate}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full gap-4 mt-4">
                    <div className="left w-full md:w-1/2 h-[130px] bg-white py-4 px-3 pb-6">
                        <h3 className="text-balance font-semibold">{order && order.username}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <p className={`py-0.5 px-2 ${order && order.deliveryPlace == "Home" ? "bg-site-color" : "bg-blue-600"} rounded-full text-white`}>{order && order.deliveryPlace}</p>
                            <p>{order && order.city}, {order && order.address}, {order && order.country}</p>
                        </div>
                        <p className="mt-4 text-sm">{order && order.phone}</p>
                    </div>
                    <div className="right w-full md:w-1/2 text-sm bg-white py-4 px-3 pb-6">
                        <h2 className="text-xl font-semibold">Total Summary</h2>
                        <div className="flex items-center justify-between mt-2">
                            <h4 className="">Subtotal(1 Item)</h4>
                            <h4>Rs. {order && order.price}</h4>
                        </div>
                        <div className="flex items-center mb-3 justify-between mt-1">
                            <h4 className="">Shipping Fee</h4>
                            <h4>Rs. {order && order.shippingFee}</h4>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between mt-3">
                            <h4 className="">Total</h4>
                            <h4 className="text-lg font-semibold">Rs. {order && order.price + order.shippingFee}</h4>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <h4 className="">Paid by</h4>
                            <h4 className="text-lg font-semibold">{order && order.paymentType}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;
