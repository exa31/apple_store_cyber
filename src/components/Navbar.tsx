"use client"

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { CartProvider, CartType } from "@/context";
import { formatRupiah } from "@/helper";


interface FormData extends FormEvent<HTMLFormElement> {
    target: HTMLElement & {
        search: {
            value: string;
        };
    };
}

export default function Navbar() {

    const pathname: string = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const cartContext: CartType | null = useContext(CartProvider)!;
    const { cart, setCart } = cartContext;
    const [active, setActive] = useState<boolean>(false);
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            axios.get('/api/cart').then(res => {
                setCart(res.data.products);
            });
        }
    }, [status, setCart]);

    const handleLogout = async () => {
        await signOut();
        await axios.get('/api/auth/logout');
    }

    const handleSearch = (e: FormData) => {
        e.preventDefault();
        const q = e.target.search.value;
        const category = searchParams.get('category');
        if (pathname !== '/shop') {
            e.target.search.value = ''
            return router.push(`/shop?q=${q}`);
        } if (category) {
            e.target.search.value = ''
            return router.push(`?category=${category}&q=${q}`)
        }
        router.push(`?q=${q}`)
        e.target.search.value = ''
    }

    const totalPriceCart = cart.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0)

    const totalProduct = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-white border-b border-gray-300 shadow-lg">
            <div className=" max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-center">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="block text-teal-600" href="#">
                            <h1 className="md:text-3xl text-lg font-bold text-black">cyber</h1>
                        </a>
                    </div>
                    <div className="sm:w-1/4 w-[100px]">
                        <form onSubmit={handleSearch} >
                            <label htmlFor="search" className="text-black gap-2 items-center rounded-lg bg-gray-100 p-2 mx-2 md:mx-8 flex">
                                <button type="submit"><HiMagnifyingGlass className="text-xl" /></button>
                                <input type="text" name="search" id="search" className="bg-transparent outline-none text-xs" placeholder="Search" />
                            </label>
                        </form>
                    </div>
                    <nav className={`flex  items-center gap-6 text-sm  ${active ? 'absolute sm:static z-40 sm:mt-0 mt-16 top-0 bg-white sm:h-auto h-screen right-0 w-60 sm:w-full flex-col transition-all duration-200 md:flex-row' : 'absolute sm:static z-40 sm:mt-0 mt-16 top-0 bg-white sm:h-auto h-screen right-0 w-0 sm:w-max overflow-hidden flex-col transition-all duration-200 sm:flex-row'}`}>
                        <p>
                            <Link className={`font-bold transition hover:text-black ${pathname === '/' ? 'text-black cursor-default' : 'text-gray-500'}`} href="/"> Home </Link>
                        </p>
                        <p>
                            <Link className={`font-bold transition hover:text-black ${pathname === '/shop' ? 'text-black cursor-default' : 'text-gray-500'}`} href="/shop"> Shop </Link>
                        </p>
                    </nav>
                    <Link href={'/likes'}>
                        <IoIosHeartEmpty className="md:ms-8 ms-0  hover:cursor-pointer btn btn-xs btn-ghost btn-circle" />
                    </Link>
                    <div className="dropdown ms-1 dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">{totalProduct}</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">{cart.length} Items</span>
                                <span className="text-info">Subtotal: {formatRupiah(totalPriceCart)}</span>
                                <div className="card-actions">
                                    <Link href={'/cart'} className="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:gap-4">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="md:w-10 w-6 rounded-full">
                                    <Image
                                        alt="Tailwind CSS Navbar component"
                                        src="/images/avatar.png"
                                        width={500}
                                        className="rounded-full w-full"
                                        height={500} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link href={status === "authenticated" ? '/account' : '/login'} className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                {status === 'authenticated' ?
                                    <li>
                                        <button
                                            className="rounded-md text-sm font-medium shadow"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                    :
                                    <>
                                        <li>

                                            <button
                                                className="rounded-md text-sm font-medium shadow"
                                                onClick={() => signIn()}
                                            >
                                                Login
                                            </button>
                                        </li>
                                        <li>
                                            <div className="hidden sm:flex">
                                                <Link
                                                    className="rounded-md text-sm font-medium text-gray-900"
                                                    href="/register"
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                        <div className="sm:flex sm:gap-4">
                        </div>
                        <div className="block sm:hidden">
                            <button onClick={() => setActive(!active)} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}