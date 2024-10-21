'use client';

import Select from "@/components/account/Select";
import { FormEvent, useEffect, useState } from "react";
import TextArea from "@/components/account/TextArea";
import { useRouter } from "next/navigation";
import { getKecamatan, getKelurahan, getKota, getProvinsi } from "@/services/wilayah";
import axios from "axios";

interface Address {
    name: string,
    kelurahan: string,
    kecamatan: string,
    kota: string,
    provinsi: string,
    detail: string,
    _id: string
}

interface EventSubmit extends FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
        name: {
            value: string
        },
        detail: {
            value: string
        }
    }
}

export default function EditAddress({ params: { id } }: { params: { id: string } }) {

    const router = useRouter();

    const [submit, setSubmit] = useState(false);

    const [error, setError] = useState({
        name: false,
        detail: false
    });

    const [data, setData] = useState({
        provinsi: [],
        kabupaten: [],
        kecamatan: [],
        kelurahan: []
    });
    const [idAddress, setIdAddress] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });
    const [address, setAddress] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
    });
    const [prevAddress, setPrevAddress] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        detail: '',
        name: ''
    });

    useEffect(() => {
        fetch(`/api/delivery-address/${id}`).then((res) => res.json()).then((data) => {
            setPrevAddress(data);
        });
    }, [id]);
    useEffect(() => {
        getProvinsi().then((data) => {
            setData((prevData) => ({
                ...prevData,
                provinsi: data
            }));
        });
    }, []);

    useEffect(() => {
        if (idAddress.provinsi) {
            getKota(idAddress.provinsi).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kabupaten: data
                }));
            });
        }
    }, [idAddress.provinsi]);

    useEffect(() => {
        if (idAddress.kabupaten) {
            getKecamatan(idAddress.kabupaten).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kecamatan: data
                }));
            });
        }
    }, [idAddress.kabupaten]);

    useEffect(() => {
        if (idAddress.kecamatan) {
            getKelurahan(idAddress.kecamatan).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kelurahan: data
                }));
            });
        }
    }, [idAddress.kecamatan]);

    function handleName(label: string, name: string) {
        setAddress({
            ...address,
            [label]: name
        });
    }

    function handleSelect(label: string, value: string) {
        setIdAddress({
            ...idAddress,
            [label]: value
        });
    }

    const handleSubmit = (e: EventSubmit) => {
        e.preventDefault();
        setSubmit(true);
        const detail = e.target.detail.value;
        const name = e.target.name.value;
        const error = {
            name: false,
            detail: false
        }

        if (name.length < 3) {
            error.name = true;
        }

        if (address.provinsi !== '') { }

        if (detail.length < 3) {
            error.detail = true;
        }

        if (error.name || error.detail) {
            setError(error);
            setSubmit(false);
            return;
        } else {
            const payload = { ...address, detail: detail, name: name };
            axios.put(`/api/delivery-address/${id}`, payload).then(() => {
                router.push('/account/address');
            }).catch((err) => {

                alert('Failed to update address');
            }).finally(() => {
                setSubmit(false);
            });
        }
    }
    return (
        <div className="p-3 w-full rounded-xl">
            <div className="py-8 mb-4 border-2">
                <h1 className="text-center text-4xl font-bold">Edit Address</h1>
            </div>
            <h4 className="text-lg font-semibold">Alamat Sebelumnya</h4>
            <p>{`${prevAddress.provinsi}, ${prevAddress.kabupaten}, ${prevAddress.kecamatan}, ${prevAddress.kelurahan}, ${prevAddress.detail}`}</p>
            <form className="mt-10 grid sm:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" defaultValue={prevAddress.name} className="input input-bordered" required />
                    {error.name && <p className="text-red-500">Name must be at least 3 characters</p>}
                </div>
                <Select name="provinsi" label="Provinsi" handleName={handleName} handleSelect={handleSelect} options={data.provinsi} />
                <Select name="kabupaten" label="Kabupaten/Kota" handleName={handleName} handleSelect={handleSelect} options={data.kabupaten} />
                <Select name="kecamatan" label="Kecamatan" handleName={handleName} handleSelect={handleSelect} options={data.kecamatan} />
                <Select name="kelurahan" label="Kelurahan" handleName={handleName} handleSelect={handleSelect} options={data.kelurahan} />
                <div>
                    <TextArea label="Detail" name="detail" value={prevAddress.detail} />
                    {error.detail && <p className="text-red-500">Detail is required</p>}
                </div>
                <div className="flex-row gap-5 mt-6 form-control">
                    <button onClick={() => window.history.back()} className="block rounded-lg  bg-transparent py-4 px-8 text-sm font-medium transition hover:scale-105 border-2 border-black text-black">Back</button>
                    <button disabled={submit} type="submit" className="block rounded-lg  bg-black px-8 text-sm font-medium transition hover:scale-105 py-4 text-white">Save</button>
                </div>
            </form>
        </div>
    )
}