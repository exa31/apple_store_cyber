'use client';

import Radio from "@/components/checkout/Radio";
import Spinner from "@/components/spinner";
import { AddressProvider } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Address {
    name: string,
    kelurahan: string,
    kecamatan: string,
    kabupaten: string,
    provinsi: string,
    detail: string,
    _id: string
}

export default function CheckoutAddress() {

    const [addresses, setAddresses] = useState<Address[]>([]);
    const addressProvider = useContext(AddressProvider);
    const { address, setAddress } = addressProvider!;
    const [loading, setLoading] = useState(true);
    const routes = useRouter();

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await fetch('/api/delivery-address');
                if (!res.ok) {
                    throw new Error()
                }
                const data = await res.json();
                if (data.status === 404) {
                    return
                }
                setLoading(false)
                setAddresses(data)
            } catch (error) {
                routes.refresh();
                console.log(error)
            }
        }
        fetchAddress()
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    return (
        <>

            {loading ? <div className="flex justify-center mt-24 items-center">
                <Spinner />
            </div> :
                addresses.length === 0 ?
                    <div className="mt-14">
                        <h1 className="text-xl font-semibold">No Address Found</h1>
                        <p className="mt-4 mb-8">{"You haven't added any address yet. Please add your address first."}</p>
                        <Link href={'/account/address/create-alamat'} className="mt-4 px-8 py-3 bg-black text-white p-2 rounded-md">Add Address</Link>
                    </div>
                    :
                    <div className="mt-14">
                        <h1 className="text-xl font-semibold">Select Address</h1>
                        <div>
                            {addresses.map((address) => (
                                <label className="flex hover:cursor-pointer mt-8 bg-slate-100 rounded-md p-6" key={address._id}>
                                    <Radio value={address._id} onChange={onChange} />
                                    <div className="flex ms-4 flex-col justify-between ">
                                        <h2 className="text-lg text-start font-semibold">{address.name}</h2>
                                        <p>Provinsi {address.provinsi}, {address.kabupaten}, {address.kecamatan}, {address.kelurahan}</p>
                                        <p>{address.detail}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="gap-8 ms-4 my-10 w-max flex md:ms-auto">
                            <Link href={`/cart`}
                                onClick={() => setAddress('')}
                                className="block rounded-lg w-full bg-transparent px-8 py-3 text-sm font-medium transition hover:scale-105 text-black border-2 border-black"
                            >
                                Back
                            </Link>
                            <Link href={'/checkout/payment'}
                                className={`block rounded-lg w-full bg-black px-8 py-3 text-sm font-medium transition hover:scale-105 text-white border-2 border-black ${address === '' ? 'pointer-events-none opacity-50 disabled' : ''}`}
                            >
                                Next
                            </Link>
                        </div>
                    </div >
            }
        </>
    )
}