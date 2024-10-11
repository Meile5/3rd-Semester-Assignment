import React, {useEffect, useState} from 'react';
import {http} from "../http.ts";
import {useAtom} from "jotai/index";
import {LoggedCustomerAtom} from "../atoms/LoggedCustomerAtom.tsx";
import {OrderHistoryAtom} from "../atoms/OrderHistoryAtom.tsx";

const OrderHistoryPage: React.FC = () => {

    const [loggedCustomer] = useAtom(LoggedCustomerAtom);
    const [orders, setOrders] = useAtom(OrderHistoryAtom);
    const [isToggled, setIsToggled] = useState(0);
    const statusSteps = ["Pending", "Processed", "Shipped", "Delivered"];

    useEffect(() => {
        http.api.paperGetCustomerOrders({ id: loggedCustomer.id }).then((response) => {
            setOrders(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [loggedCustomer, setOrders])


    return (
        <div className="pt-10 pb-10 flex flex-col items-center">
            <header className="mb-6">
            </header>

            {Array.isArray(orders) && orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                Array.isArray(orders) && orders.map((order, index) => (
                    <div onClick={e => setIsToggled(index)} key={order.id}
                         className="collapse collapse-arrow bg-[#e4e4e7] mb-2 w-2/3">
                        <input type="radio" name="my-accordion-2" checked={isToggled == index}/>
                        <div className="collapse-title text-xl font-medium">
                            {/* Order info separated by a pipe */}
                            <span>Order #{order.id}</span>
                            <span className="mx-5">|</span>
                            <span>Order Date: {order.orderDate ? new Date(order.orderDate).toISOString().split('T')[0] : 'N/A'}</span>
                            <span className="mx-5">|</span>
                            <span>Delivery Date: {order.deliveryDate}</span>
                            <span className="mx-5">|</span>
                            <span>Total: {order.totalAmount} €</span>
                        </div>
                        <div className="collapse-content">
                            <h3 className="text-lg font-semibold mb-2">Status</h3>
                            <ul className="steps mb-2 ">
                                {statusSteps.map((step, stepIndex) => {
                                    // Highlight this step and all previous steps if the order status is at least this step
                                    const isStepActive = statusSteps.indexOf(order.status || "Pending") >= stepIndex;
                                    return (
                                        <li
                                            key={step}
                                            className={`step ${isStepActive ? 'step-primary' : ''} step-neutral`} // Highlight the active status
                                            style={{cursor: 'pointer'}}
                                        >
                                            {step}
                                        </li>
                                    );
                                })}
                            </ul>
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
