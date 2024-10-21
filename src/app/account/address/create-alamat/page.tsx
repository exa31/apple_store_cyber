'use client';

import Select from "@/components/account/Select";
import { FormEvent, useEffect, useState } from "react";
import TextArea from "@/components/account/TextArea";
import { useRouter } from "next/navigation";
import { getKecamatan, getKelurahan, getKota, getProvinsi } from "@/services/wilayah";

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

export default function CreateAlamat() {

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
    const [id, setId] = useState({
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


    useEffect(() => {
        getProvinsi().then((data) => {
            setData((prevData) => ({
                ...prevData,
                provinsi: data
            }));
        });
    }, []);

    useEffect(() => {
        if (id.provinsi) {
            getKota(id.provinsi).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kabupaten: data
                }));
            });
        }
    }, [id.provinsi]);

    useEffect(() => {
        if (id.kabupaten) {
            getKecamatan(id.kabupaten).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kecamatan: data
                }));
            });
        }
    }, [id.kabupaten]);

    useEffect(() => {
        if (id.kecamatan) {
            getKelurahan(id.kecamatan).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kelurahan: data
                }));
            });
        }
    }, [id.kecamatan]);

    function handleName(label: string, name: string) {
        if (label === 'provinsi' && address.kabupaten !== '') {
            setAddress({
                ...address,
                kabupaten: '',
                kecamatan: '',
                kelurahan: ''
            });
            setId({
                ...id,
                kabupaten: '',
                kecamatan: '',
                kelurahan: ''
            });
            setData({
                ...data,
                kabupaten: [],
                kecamatan: [],
                kelurahan: []
            })
        }
        setAddress({
            ...address,
            [label]: name
        });
    }

    function handleSelect(label: string, value: string) {
        setId({
            ...id,
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

        if (detail.length < 3) {
            error.detail = true;
        }

        if (error.name || error.detail) {
            setError(error);
            setSubmit(false);
            return;
        } else {
            const payload = { ...address, detail: detail, name: name };
            fetch('/api/delivery-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then((res) => {
                if (res.ok) {
                    router.back();
                }
            }).catch((error) => {
                alert('Failed to create address');
                console.log(error);
            }).finally(() => {
                setSubmit(false);
            });
        }
    }
    return (
        <div className="p-3 w-full rounded-xl">
            <div className="py-8 border-2">
                <h1 className="text-center text-4xl font-bold">Create Address</h1>
            </div>
            <form className="mt-10 grid sm:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                    {error.name && <p className="text-red-500">Name must be at least 3 characters</p>}
                </div>
                <Select name="provinsi" label="Provinsi" handleName={handleName} handleSelect={handleSelect} options={data.provinsi} />
                <Select name="kabupaten" label="Kabupaten/Kota" handleName={handleName} handleSelect={handleSelect} options={data.kabupaten} />
                <Select name="kecamatan" label="Kecamatan" handleName={handleName} handleSelect={handleSelect} options={data.kecamatan} />
                <Select name="kelurahan" label="Kelurahan" handleName={handleName} handleSelect={handleSelect} options={data.kelurahan} />
                <div>
                    <TextArea label="Detail" name="detail" />
                    {error.detail && <p className="text-red-500">Detail is required</p>}
                </div>
                <div className="flex-row gap-5 mt-6 form-control">
                    <button onClick={() => router.back()} className="block rounded-lg  bg-transparent py-4 px-8 text-sm font-medium transition hover:scale-105 border-2 border-black text-black">Back</button>

                    <button disabled={submit || id.kelurahan === ''} type="submit" className={`block rounded-lg ${id.kelurahan === '' && "btn-disabled btn"}  bg-black px-8 text-sm font-medium transition hover:scale-105 py-4 text-white`}>Save</button>

                </div>
            </form>
        </div>
    )
}