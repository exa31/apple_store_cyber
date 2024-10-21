'use client'
import Spinner from "@/components/spinner";
import axios from "axios";
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

export default function Address() {

    const [address, setAddress] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await fetch('/api/delivery-address');
                if (!res.ok) {
                    throw new Error()
                }
                const data = await res.json();
                if (data.status === 404) {
                    setLoading(false)
                    return
                }
                setLoading(false)
                setAddress(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAddress()
    }, []);

    function handleDelete(id: string) {
        axios.delete(`/api/delivery-address/${id}`).then((res) => {
            const newAddress = address.filter((data) => {
                return data._id !== id
            })
            setAddress(newAddress)
        }).catch((err) => new Error(err))
    }
    return (
        <>
            <>
                {loading ? <div className="mx-auto mt-52">
                    <Spinner />
                </div> :
                    address.length === 0 ?
                        <div className="text-center text-xl font-medium mt-10">
                            <div >
                                Maaf belum ada alamat yang dibuat
                            </div>
                            <div className="flex justify-center m-4">
                                <Link href='/account/address/create-alamat' className="px-8 py-4 rounded-xl bg-black text-white ">Create</Link>
                            </div>
                        </div>
                        :
                        <div className="max-h-screen  sm:w-full mx-10 overflow-x-auto">
                            <table className="table overflow-auto text-center">
                                <thead className="text-lg py-4 border-b-2 font-semibold">
                                    <tr>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Alamat
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {address.map((data, index) =>
                                    <tbody className="sm:text-lg text-sm py-4" key={index}>
                                        <tr>
                                            <td>{data.name}</td>
                                            <td> Desa {data.kelurahan}, Kecamatan {data.kecamatan}, {data.kabupaten}, {data.provinsi}, {data.detail}</td>
                                            <td><Link className="btn btn-sm rounded-2xl btn-warning" href={`/account/address/edit-alamat/${data._id}`}>Edit</Link></td>
                                            <td><button className="btn btn-sm rounded-2xl btn-warning" onClick={() => handleDelete(data._id)}>Delete</button></td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                            <div className="flex justify-start  m-4">
                                <Link href='/account/address/create-alamat' className=" rounded-2xl text-white btn btn-primary">Create alamat</Link>
                            </div>
                        </div >
                }
            </>
        </>
    )
};