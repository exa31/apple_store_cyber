'use client';

import Spinner from "@/components/spinner";
import { formatRupiah } from "@/helper";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Address {
    name: string,
    kelurahan: string,
    kecamatan: string,
    kabupaten: string,
    provinsi: string,
    detail: string,
    _id: string
}

interface Invoice {
    _id: string;
    user: {
        name: string,
        email: string
    };
    delivery_address: Address;
    quantity: number;
    total: number;
    createdAt: string;
    tax: number;
    order: {
        token: string;
        order_items: {
            id: string,
            name: string,
            price: number,
            quantity: number
        }[];
    };
    payment_method: string;
    shipping: number;
    status_payment: string;
    discount: number;
    status_delivery: string;
};

export default function Invoice({ params: { invoice } }: { params: { invoice: string } }) {

    const [data, setData] = useState<Invoice>()!;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/invoice/${invoice}`)
            .then(response => response.json())
            .then((data) => {
                setLoading(false);
                setData(data)
            });
    }, [invoice]);

    const quantity = data?.order.order_items.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    return (
        <>
            {loading ? <div className="m-auto">
                <Spinner />
            </div>
                :
                <div className="container mb-10 min-h-screen pt-12 mx-auto">
                    <div className="container m-auto bg-base-200 rounded-2xl" >
                        <div className="bg-base-300">
                            <h1 className="p-4 text-lg font-bold opacity-50 text-start">Invoices</h1>
                        </div>
                        <div className="mb-10 p-8 overflow-x-auto">
                            <div className='grid grid-cols-2 gap-6'>
                                <h4 className='font-bold'>Payment Method</h4>
                                <p>{!data?.payment_method ? 'Select method payment' : data?.payment_method}</p>
                                <h4 className='font-bold'>Status Payment</h4>
                                <p>{data?.status_payment}</p>
                                <h4 className='font-bold'>Order ID</h4>
                                <p>{data?._id}</p>
                                <h4 className='font-bold'>Order Date</h4>
                                <p>{data?.createdAt.slice(0, ('yyyy-mm-dd').length)}</p>
                                <h4 className='font-bold'>Tax</h4>
                                <p>{formatRupiah(data?.tax!)}</p>
                                <h4 className='font-bold'>Shipping</h4>
                                <p>{formatRupiah(data?.shipping!)}</p>
                                <h4 className='font-bold'>Discount</h4>
                                <p>{formatRupiah(data?.discount!)}</p>
                                <h4 className='font-bold'>Total Quantity</h4>
                                <p>{quantity}</p>
                                <h4 className='font-bold'>Order Items</h4>
                                <div className="flex flex-col gap-6">
                                    {data?.order.order_items.map((item, index) => (
                                        <div key={index}>
                                            <h4>{item.name}</h4>
                                            <p>{formatRupiah(item.price)} x {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                                <h4 className='font-bold'>Subtotal</h4>
                                <p>{formatRupiah(data?.total! - data?.tax! - data?.shipping! + data?.discount!)}</p>
                                <h4 className='font-bold'>Total Amount</h4>
                                <p>{formatRupiah(data?.total!)}</p>
                                <h4 className='font-bold'>Billed to</h4>
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h4>{data?.user.name}</h4>
                                        <p>{data?.user.email}</p>
                                    </div>
                                    <div>
                                        <p>Desa {data?.delivery_address.kelurahan}, Kecamatan {data?.delivery_address.kecamatan}, {data?.delivery_address.kabupaten}, {data?.delivery_address.provinsi}, {data?.delivery_address.detail}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <Link href={'/account/order'} className="block px-8 rounded-lg w-max bg-black p-4 text-sm font-medium transition hover:scale-105 text-white border-2 border-black">Back</Link>
                                {data?.status_payment === 'pending' &&
                                    <button onClick={() => window.snap.pay(data?.order.token)} className="block rounded-lg w-max bg-black p-4 text-sm font-medium transition hover:scale-105 text-white border-2 px-8 border-black">Payment</button>
                                }
                            </div>
                        </div>
                    </div >
                </div >
            }
        </>
    )
}