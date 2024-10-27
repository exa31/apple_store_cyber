'use client'

import { DiscountProvider } from "@/context";
import { formatRupiah } from "@/helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

declare global {
    interface Window {
        snap: any;
    }
}

interface PaymentSummaryProps {
    addressId: string;
    subTotal: number
    setCart: (cart: any) => void
    setAddress: (id: string) => void
}

export default function PaymentSummary({ setCart, subTotal, addressId, setAddress }: PaymentSummaryProps) {

    const dicsountProvider = useContext(DiscountProvider)
    const { discount, setDiscount } = dicsountProvider!
    const tax = 200000
    const shipping = 20000
    const total = subTotal + tax + shipping
    const router = useRouter()

    const handlePay = async () => {
        try {
            if (subTotal === 0) {
                return router.push('/shop')
            }
            const checkout = await axios.post('/api/order', {
                subTotal,
                tax,
                shipping,
                discount,
                total,
                deliveryAddress: addressId
            })
            const token = checkout.data.token
            setDiscount(0)
            setAddress('')
            setCart([])
            return window.snap.pay(token)
        } catch (error) {
            throw new Error()
        }
    }


    return (
        <div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg">Subtotal</span>
                <span className="text-lg font-semibold">{formatRupiah(subTotal)}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg">Tax</span>
                <span className="text-lg font-semibold">{formatRupiah(tax)}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg">Shipping & Handling</span>
                <span className="text-lg font-semibold">{formatRupiah(shipping)}</span>
            </div>
            {discount !== 0 &&
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold">Discount</span>
                    <span className="text-lg font-semibold">{formatRupiah(discount)}</span>
                </div>
            }
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">{formatRupiah(discount !== 0 ? total - discount : total)}</span>
            </div>
            <div className="flex w-1/2 gap-8">
                <Link href="/checkout/address"
                    className="block mt-6 text-center rounded-lg w-full bg-black p-4 text-sm font-medium transition hover:scale-105 text-white border-2 border-black">
                    Back
                </Link>
                <button
                    onClick={handlePay}
                    className="block mt-6 text-center rounded-lg w-full bg-black p-4 text-sm font-medium transition hover:scale-105 text-white border-2 border-black"
                >
                    Pay
                </button>
            </div>
        </div>
    )
}