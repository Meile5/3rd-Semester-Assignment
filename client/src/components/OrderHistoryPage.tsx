import React, {useEffect} from 'react';
import {http} from "../http.ts";
import {useAtom} from "jotai/index";
import {LoggedCustomerAtom} from "../atoms/LoggedCustomerAtom.tsx";
import {OrderHistoryAtom} from "../atoms/OrderHistoryAtom.tsx";

const OrderHistoryPage: React.FC = () => {

    const [loggedCustomer] = useAtom(LoggedCustomerAtom);
    const [orders, setOrders] = useAtom(OrderHistoryAtom);

    useEffect(() => {
        http.api.paperGetCustomerOrders({ id: loggedCustomer.id }).then((response) => {
            setOrders(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [loggedCustomer, setOrders])


    return (
        <div className="pt-10 pl-10 pr-10 pb-10">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Order History</h1>
            </header>

            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                orders.map((order, index) => (
                    <div key={order.id} className="collapse collapse-arrow bg-base-200 mb-4">
                        <input type="radio" name="my-accordion-2" defaultChecked={index === 0}/>
                        <div className="collapse-title text-xl font-medium">
                            {/* Order info separated by a pipe */}
                            {`Order #${order.id} | Order Date: ${order.orderDate} | Delivery Date: ${order.deliveryDate} | Status: ${order.status} | Total: $${order.totalAmount}`}
                        </div>
                        <div className="collapse-content">
                            <h3 className="text-lg font-semibold">Ordered Products:</h3>
                            <ul className="list-disc ml-5">
                                {order.orderEntries?.map(orderEntry => (
                                    <li key={orderEntry.id}>
                                        {orderEntry.product?.name} - Quantity: {orderEntry.quantity} - Price: ${orderEntry.product?.price}
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
