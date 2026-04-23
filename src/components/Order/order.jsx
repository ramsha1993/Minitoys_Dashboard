import React, { useMemo, useState, useEffect } from "react";
import { Eye, Trash2, FileText, Phone, MapPin, Clock3 } from "lucide-react";
import api from "../../api/axiosinterceptor";
import ENDPOINTS from "../../utils/ENDPOINTS";

const actionBtn =
    "inline-flex h-6 w-6 items-center justify-center rounded-sm text-white transition hover:opacity-90";

export default function OrderTable() {
    const [activeTab, setActiveTab] = useState("orders"); // 👈 tab state
    const [dateRange, setDateRange] = useState("");
    const [status, setStatus] = useState("All Orders");
    const [paymentMethod, setPaymentMethod] = useState("All Payment Methods");
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderItems, setOrderItems] = useState(); // 👈 order items state
    const [user, setUser] = useState(() => {
        const auth = localStorage.getItem("auth")
        console.log("auth", auth)
        return auth ? JSON.parse(auth) : null  //;
    })
    const FetchOrders = async () => {
        const response = await api.get({ url: `${ENDPOINTS.OTHER.ORDER}/all` });
        console.log("response", response.orders);
        setOrders(response.orders);
    };

    const FetchOrderItems = async () => {
        const response = await api.get({ url: `${ENDPOINTS.OTHER.ORDER}/orderItems` }); // 👈 your order items endpoint
        console.log("orderItems", response.orderItems);
        setOrderItems(response.orders);
    };

    useEffect(() => {
        if (user.role === "vendor") {
            FetchOrderItems();
        }
        else {
            FetchOrderItems();

            FetchOrders();
        }

    }, []);

    const applyFilters = (date, payment) => {
        let filtered = [...orders];
        if (date) {
            filtered = filtered.filter((elem) => elem.createdAt.split("T")[0] === date);
        }
        if (payment) {
            filtered = filtered.filter((elem) => elem.pay_method === payment);
        }
        setFilteredOrders(filtered);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDateRange(selectedDate);
        applyFilters(selectedDate, paymentMethod);
    };

    const handlePayment = (e) => {
        const selectedMethod = e.target.value;
        setPaymentMethod(selectedMethod);
        applyFilters(dateRange, selectedMethod);
    };

    const displayOrder = filteredOrders.length === 0 ? orders : filteredOrders;

    return (
        <div className="w-full bg-white p-4">

            {/* ✅ Tabs */}
            <div className="mb-4 flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-6 py-2 text-sm font-semibold transition border-b-2 ${activeTab === "orders"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab("orderItems")}
                    className={`px-6 py-2 text-sm font-semibold transition border-b-2 ${activeTab === "orderItems"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Order Items
                </button>
            </div>

            {/* ✅ Orders Tab */}
            {activeTab === "orders" && (
                <>
                    {/* Filter Header */}
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 items-end">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                Date range:
                            </label>
                            <div className="flex overflow-hidden rounded border border-gray-300 bg-white">
                                <div className="flex items-center justify-center border-r border-gray-300 bg-gray-100 px-4">
                                    <Clock3 size={22} className="text-gray-600" />
                                </div>
                                <input
                                    type="date"
                                    value={dateRange}
                                    onChange={handleDateChange}
                                    className="w-full px-4 py-2 text-md outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-md outline-none"
                            >
                                <option>All Orders</option>
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                Payment Method
                            </label>
                            <select
                                value={paymentMethod}
                                onChange={handlePayment}
                                className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-md outline-none"
                            >
                                <option>All Payment Methods</option>
                                <option>COD</option>
                                <option>Card</option>
                                <option>Wallet</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-gray-200">
                        <table className="max-w-full border-collapse text-sm">
                            <thead className="bg-white">
                                <tr className="border-b border-gray-200 text-left text-gray-700">
                                    {["Order ID", "User Name", "Total(AED)", "Shipping Fee", "Final Total(AED)", "Payment Method", "Order Date", "Action"].map((head) => (
                                        <th key={head} className="whitespace-nowrap border-r border-gray-200 px-4 py-3 font-semibold last:border-r-0">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {displayOrder.map((order, index) => (
                                    <tr key={order.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                        <td className="border-r border-gray-200 px-4 py-4">{order.id}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{order.user?.name}</td>
                                        {/* <td className="border-r border-gray-200 px-4 py-4">{order.seller}</td> */}
                                        <td className="border-r border-gray-200 px-4 py-4">{order.subTotal}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{order.shippingFee}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{order.totalAmount}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{order.pay_method}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{order.createdAt ? order.createdAt.split("T")[0] : "-"}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className={`${actionBtn} bg-blue-500`} title="View"><Eye size={14} /></button>
                                                <button className={`${actionBtn} bg-red-500`} title="Delete"><Trash2 size={14} /></button>
                                                <button className={`${actionBtn} bg-cyan-500`} title="Invoice"><FileText size={14} /></button>
                                                <button className={`${actionBtn} bg-green-500`} title="Call"><Phone size={14} /></button>
                                                <button className={`${actionBtn} bg-emerald-500`} title="Location"><MapPin size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ✅ Order Items Tab */}
            {activeTab === "orderItems" && (
                <div className="overflow-x-auto border border-gray-200">
                    <table className="max-w-full border-collapse text-sm">
                        <thead className="bg-white">
                            <tr className="border-b border-gray-200 text-left text-gray-700">
                                {["#", "Order ID", "Product Name", "Price", "Quantity", "Seller ID", "Date", "Action"].map((head) => (
                                    <th key={head} className="whitespace-nowrap border-r border-gray-200 px-4 py-3 font-semibold last:border-r-0">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems?.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-4 py-6 text-center text-gray-400">
                                        No order items found
                                    </td>
                                </tr>
                            ) : (
                                user.role == "vendor" ? orderItems?.filter((item, index) => item.seller_id == user.id).map((item, index) => (
                                    <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                        <td className="border-r border-gray-200 px-4 py-4">{index + 1}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.order_id}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.name}</td>

                                        <td className="border-r border-gray-200 px-4 py-4">{item.price}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.quantity}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item?.seller?.name || item.seller_id}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.createdAt ? item.createdAt.split("T")[0] : "-"}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className={`${actionBtn} bg-blue-500`} title="View"><Eye size={14} /></button>
                                                <button className={`${actionBtn} bg-red-500`} title="Delete"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : orderItems?.map((item, index) => (
                                    <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                        <td className="border-r border-gray-200 px-4 py-4">{index + 1}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.order_id}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.name}</td>

                                        <td className="border-r border-gray-200 px-4 py-4">{item.price}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.quantity}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item?.seller?.name || item.seller_id}</td>
                                        <td className="border-r border-gray-200 px-4 py-4">{item.createdAt ? item.createdAt.split("T")[0] : "-"}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className={`${actionBtn} bg-blue-500`} title="View"><Eye size={14} /></button>
                                                <button className={`${actionBtn} bg-red-500`} title="Delete"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rows per page */}
            <div className="flex items-center gap-2 px-2 py-3 text-sm text-gray-700">
                <select className="border border-gray-300 bg-gray-500 px-2 py-1 text-white outline-none">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <span>rows per page</span>
            </div>
        </div>
    );
}