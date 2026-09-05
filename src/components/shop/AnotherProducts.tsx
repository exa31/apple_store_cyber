/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react";
import { CardProps } from "../type";

import CardShopDetail from "./CardShopDetail";

import CardSkeleton from "./CardSkeleton";

export default function AnotherProducts({ category, id, favorite, setFavorite }: { id: string, category: string, favorite: { _id: string }[], setFavorite: (favorite: { _id: string }[]) => void }) {

    const [products, setProducts] = useState<CardProps[]>([])
    const [count, setCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const [skip, setSkip] = useState<number>(0)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/products?limit=12&skip=${skip * 12}&category=${category}&id=${id}`).then(res => res.json()).then(data => {
            const list = data?.products || data?.data?.products || [];
            const count = data?.count !== undefined ? data.count : (data?.data?.count || 0);
            setProducts([...products, ...list])
            setCount(count)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [skip, id, category])

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center mt-20 justify-center gap-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-neutral-900">Related Products</h1>
                <div className="container mb-12 gap-5 mt-4 mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {products.map((item: CardProps, index: number) => {
                        return (
                            <CardShopDetail key={index} setFavorite={setFavorite} product={item} favorite={favorite} />
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-center mb-16">
                {loading ? (
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                ) : (
                    <button
                        className={`rounded-full bg-neutral-100 hover:bg-neutral-200 px-8 py-3 text-xs font-semibold text-neutral-800 transition-all shadow-sm ${
                            products.length >= count ? "hidden" : ""
                        }`}
                        onClick={() => {
                            setSkip(skip + 1);
                            setLoading(true);
                        }}
                    >
                        Load More Products
                    </button>
                )}
            </div>
        </div>
    )
}