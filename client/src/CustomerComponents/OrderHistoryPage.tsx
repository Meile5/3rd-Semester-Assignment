import React, {useEffect, useState} from 'react';
import {http} from "../http.ts";
import {useAtom} from "jotai/index";
import {LoggedCustomerAtom} from "../atoms/LoggedCustomerAtom.tsx";
import {OrderHistoryAtom} from "../atoms/OrderHistoryAtom.tsx";

const OrderHistoryPage: React.FC = () => {

    const [loggedCustomer] = useAtom(LoggedCustomerAtom);
    const [orders, setOrders] = useAtom(OrderHistoryAtom);
    const [isToggled, setIsToggled] = useState(0);

    useEffect(() => {
        http.api.paperGetCustomerOrders({ id: loggedCustomer.id }).then((response) => {
            setOrders(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [loggedCustomer, setOrders])


    return (
        <div className="pt-10 pl-44 pr-44 pb-10">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Order History</h1>
            </header>

            {Array.isArray(orders) && orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                Array.isArray(orders) && orders.map((order, index) => (
                    <div onClick={e => setIsToggled(index)} key={order.id}
                         className="collapse collapse-arrow bg-[#e4e4e7] mb-4">
                        <input type="radio" name="my-accordion-2" checked={isToggled == index}/>
                        <div className="collapse-title text-xl font-medium">
                            {/* Order info separated by a pipe */}
                            <span>Order #{order.id}</span>
                            <span className="mx-5">|</span>
                            <span>Order Date: {order.orderDate ? new Date(order.orderDate).toISOString().split('T')[0] : 'N/A'}</span>
                            <span className="mx-5">|</span>
                            <span>Delivery Date: {order.deliveryDate}</span>
                            <span className="mx-5">|</span>
                            <span>Status: {order.status}</span>
                            <span className="mx-5">|</span>
                            <span>Total: {order.totalAmount} €</span>
                        </div>
                        <div className="collapse-content">
                            <h3 className="text-lg font-semibold">Products:</h3>
                            <ul className="list-disc ml-5">
                                {order.orderEntries?.map(orderEntry => (
                                    <li key={orderEntry.id}
                                        className="mb-2"> {/* Optional spacing between list items */}
                                        <span>{orderEntry.product?.name}</span>
                                        <span className="mx-4">|</span>
                                        <span>Quantity: {orderEntry.quantity}</span>
                                        <span className="mx-4">|</span>
                                        <span>Price: {orderEntry.product?.price} €</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderHistoryPage;
