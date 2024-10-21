'use client'

import Spinner from "@/components/spinner";
import { formatRupiah } from "@/helper";
import Link from "next/link";
import { useEffect, useState } from "react"

interface Order {
    _id: string,
    status_payment: string,
    status_delivery: string,
    payment_method: string,
    total: number,
    order_items: {
        _id: string,
        name: string,
        price: number,
        quantity: number
    }[]
}

export default function Order() {

    const [order, setOrder] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/order')
            .then(response => response.json())
            .then((data) => {
                setOrder(data);
                setLoading(false);
            });
    }, []);

    return (
        <>


            {loading ? <div className="mx-auto mt-52">
                <Spinner />
            </div> :

                order.length === 0 ?
                    <div className="text-center text-xl font-medium mt-10">
                        <div >
                            Maaf belum ada order yang dibuat
                        </div>
                        <div className="flex justify-center m-4">
                            <Link href='/shop' className="px-8 py-4 rounded-xl bg-black text-white ">Shop</Link>
                        </div>
                    </div>
                    :
                    <div className="max-h-screen  sm:w-full mx-10 overflow-x-auto">
                        <table className="table overflow-auto text-center">
                            <thead className="text-lg py-4 border-b-2 font-semibold">
                                <tr>
                                    <th>
                                        Id
                                    </th>
                                    <th>
                                        Status Payment
                                    </th>
                                    <th>
                                        Status Delivery
                                    </th>
                                    <th>
                                        Total Product
                                    </th>
                                    <th>
                                        Total Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map((data) => {
                                    return (
                                        <tr key={data._id}>
                                            <td>
                                                {data._id}
                                            </td>
                                            <td>
                                                {data.status_payment}
                                            </td>
                                            <td>
                                                {data.status_delivery}
                                            </td>
                                            <td>
                                                {data.order_items.length}
                                            </td>
                                            <td>
                                                {formatRupiah(data.total)}
                                            </td>
                                            <td>
                                                <Link
                                                    className="px-4 py-2 bg-black text-white rounded-xl"
                                                    href={`/account/order/${data._id}`}>
                                                    Invoice
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
};