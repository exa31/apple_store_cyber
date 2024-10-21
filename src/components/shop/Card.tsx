'use client'

import Image from "next/image";
import { CardProps } from "../type";
import { formatRupiah } from "@/helper/index";
import { IoIosHeartEmpty } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CartProvider } from "@/context";

interface CartItems {
    product: CardProps;
    setShow?: (show: boolean) => void;
    favorite: { _id: string }[];
    setFavorite?: (favorite: { _id: string }[]) => void;
}

export default function CardShop({ product, setShow, favorite, setFavorite }: CartItems) {

    const [isFavorite, setIsFavorite] = useState(false)
    const { status } = useSession()
    const router = useRouter()
    const CartContext = useContext(CartProvider);
    const { cart, setCart } = CartContext!;


    const handleLike = async (e: React.MouseEvent<SVGAElement>) => {
        e.stopPropagation();
        if (status !== 'authenticated') {
            return router.push('/login')
        }
        try {
            const res = await axios.post('/api/like', {
                productId: product._id
            })
            if (res.status === 200) {
                setIsFavorite(!isFavorite);
                if (setFavorite !== undefined) {
                    const existProduct = favorite.find((item) => item._id === product._id)
                    if (existProduct) {
                        console.log(favorite)
                        const newFavorite = favorite.filter((item) => item._id !== product._id)
                        setFavorite(newFavorite)!
                    } else {
                        console.log(favorite)
                        setFavorite([...favorite, product])!
                    }
                }

            }
        } catch (error) {
            return
        }
    };
    useEffect(() => {
        if (status !== 'authenticated') {
            return
        }
        const isFav = favorite.some((item) => item._id === product._id);
        setIsFavorite(isFav);

    }, [favorite, status, product._id])

    const handleAddCart = async () => {
        if (status !== 'authenticated') {
            return router.push('/login')
        }
        const res = await axios.post('/api/cart/add', {
            productId: product._id,
            quantity: 1
        })
        if (res.status === 200) {
            if (setShow) {
                setShow(true)
            }
            const existProduct = cart.find((item) => item.product._id === product._id)
            if (existProduct) {
                const newCart = cart.map((item) => {
                    if (item.product._id === product._id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
                setCart(newCart)
            } else
                setCart([...cart, { product: product, quantity: 1 }])
        } else {
            return
        }
    }

    return (
        <>
            <div className="group relative block overflow-hidden rounded-lg bg-slate-100 m-4">
                <button
                    className="z-10 w-full rounded-full text-gray-900 transition hover:text-gray-900/75"
                >
                    {isFavorite ?
                        <FcLike onClick={handleLike} className="ms-auto my-2 hover:cursor-pointer me-4 text-2xl " />
                        :
                        <IoIosHeartEmpty onClick={handleLike} className="ms-auto hover:cursor-pointer text-black my-2 me-4 text-2xl " />
                    }
                </button>
                <Image
                    src={`https://backend-store-apple.vercel.app/images${product.image_thumbnail}`}
                    alt={product.name}
                    width={500}
                    priority={true}
                    height={500}
                    className="h-96 md:w-96 w-72 object-contain transition duration-500 group-hover:scale-105 p-0 overflow-hidden sm:h-72"
                />
                <div className="relative p-6 text-center">
                    <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1.5 text-2xl font-semibold text-gray-700">{formatRupiah(product.price)}</p>
                    <div className="mt-4 flex flex-col gap-5 justify-center">
                        <Link href={`/shop/${product._id}`}
                            className="block rounded-lg w-full bg-transparent p-4 text-sm font-medium transition hover:scale-105 text-black border-2 border-black"
                        >
                            See Detail
                        </Link>
                        <button
                            onClick={handleAddCart}
                            className="block rounded-lg w-full bg-black p-4 text-sm font-medium transition hover:scale-105 text-white border-2 border-black"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}