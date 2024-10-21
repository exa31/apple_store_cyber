'use client';
import { CardProps } from "@/components/type";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { formatRupiah } from "@/helper/index";
import AnotherProducts from "@/components/shop/AnotherProducts";
import Loading from "./loading";
import Link from "next/link";
import ReviewSec from "@/components/shop/ReviewSec";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CartProvider } from "@/context";


export default function Detail({ params: { products } }: { params: { products: string } }) {
    const [product, setProduct] = useState({} as CardProps);
    const [images, setImages] = useState([] as string[]);
    const [thisFavorite, setThisFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [favorite, setFavorite] = useState<{ _id: string }[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [isActiveImage, setIsActiveImage] = useState<string>('');

    const CartContext = useContext(CartProvider);
    const router = useRouter();
    const { status } = useSession();
    const { cart, setCart } = CartContext!;

    useEffect(() => {
        if (status !== 'authenticated') {
            return
        }
        const isFav = favorite.some((item) => item._id === product._id);
        setThisFavorite(isFav);
    }, [favorite, product, status]);

    useEffect(() => {
        fetch('/api/like').then(res => res.json()).then(data => {
            setFavorite(data);
            data.forEach((item: { _id: string }) => {
                if (item._id === products) {
                    setThisFavorite(true);
                }
            })
        }).catch(err => {
            console.log(err);
            return new Error(err);
        })
    }, [status, products]);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/products/${products}`).then(res => res.json()).then(data => {
            setImages([...data.data.image_details, data.data.image_thumbnail]);
            setProduct(data.data);
            setLoading(false);
            setIsActiveImage(data.data.image_thumbnail);
        }).catch(err => {
            console.log(err);
            return new Error(err);
        })
    }, [products]);

    const handleLike = async () => {
        if (status !== 'authenticated') {
            return router.push('/login')
        }
        try {
            const res = await axios.post('/api/like', {
                productId: product._id
            })
            if (res.status === 200) {
                if (!thisFavorite) {
                    const newFavorite = [...favorite, product];
                    setFavorite(newFavorite);
                    setThisFavorite(!thisFavorite);
                } else {
                    console.log('true');
                    const favoriteFilter = favorite.filter((item) => item._id !== product._id);
                    console.log(favoriteFilter);
                    setFavorite(favoriteFilter);
                    setThisFavorite(!thisFavorite);
                }
            }
        } catch (error) {
            return
        }
    };

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
            {loading ? <Loading />
                :
                <div className=" flex flex-col">
                    <div className={`fixed left-0 z-50 p-10 m-10 rounded-e-full bottom-0 text-white bg-slate-500 transition-all duration-300 ${show ? '-translate-x-0' : '-translate-x-[200%]'}`}>
                        Product Success Added to Cart 👍👍👍
                    </div>
                    <div className="flex mt-8 gap-4">
                        <Link href="/shop" className="text-lg cursor-pointer opacity-70">Shop</Link>
                        <p className="text-lg opacity-70">{'>'}</p>
                        <p className="text-lg">{product.name}</p>
                    </div>
                    <div className="flex container lg:flex-row flex-col items-center  mx-auto  sm:px-20 py-10">
                        <div className="flex lg:flex-col gap-8 ">
                            {images?.map((image, index) => {
                                return (
                                    <Image
                                        key={index}
                                        onClick={() => setIsActiveImage(image)}
                                        className={`sm:w-20 w-10  ${isActiveImage === image ? 'scale-125 ' : 'opacity-50'}`}
                                        src={`https://backend-store-apple.vercel.app/images${image}`}
                                        width={100}
                                        height={100}
                                        alt={product.name} />
                                )
                            })}
                        </div>
                        <div className="sm:mt-0 mt-10">
                            <Image
                                src={`https://backend-store-apple.vercel.app/images${isActiveImage}`}
                                width={410}
                                className="object-cover sm:w-full    sm:h-[500px]"
                                height={516}
                                alt={product.name} />
                        </div>
                        <div className="flex-1 sm:ms-10">
                            <h1 className="sm:text-5xl text-3xl font-bold">{product.name}</h1>
                            <div className="flex">
                                <p className="sm:text-2xl font-semibold mt-4">{formatRupiah(product.price)}</p>
                                <p className="text-lg opacity-50 ms-4 line-through font-semibold mt-4">{formatRupiah(product.price + 1000000)}</p>
                            </div>
                            <p className="text-base text-justify mt-4">{product.description}</p>
                            <div className="flex sm:flex-row flex-col mt-10 sm:w-[26rem] gap-8">
                                <button
                                    onClick={handleLike}
                                    className="block rounded-lg w-full px-4 py-2 text-sm font-medium transition hover:scale-105 text-black border-2 border-black"
                                >
                                    {thisFavorite ? 'Remove from watchlist' : 'Add to Watchlist'}
                                </button>
                                <button
                                    onClick={handleAddCart}
                                    className="block rounded-lg w-full bg-black p-4 text-sm font-medium transition hover:scale-105 text-white"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto">
                        <ReviewSec />
                    </div>
                    <div className="container mx-auto">
                        <AnotherProducts id={product._id} favorite={favorite} setFavorite={setFavorite} category={product.category?.name as string} />
                    </div>
                </div>
            }
        </>
    )
}