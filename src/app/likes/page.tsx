'use client'

import { CardProps } from "@/components/type"
import { useEffect, useState } from "react"
import Loading from "./loading"
import CardLikes from "@/components/likes/CardLikes"
import axios from "axios"

export default function Likes() {

    const [data, setData] = useState<CardProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/like')
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                return new Error(err)
            })
    }, [])

    const removeFavorite = (id: string) => {
        axios.post('/api/like', {
            productId: id
        }).then(res => {
            if (res.status === 200) {
                const newData = data.filter(item => item._id !== id)
                setData(newData)
            }
        }).catch(err => {
            console.log(err)
            return new Error(err)
        })
    }

    return (

        <>
            {loading ? <Loading /> : data.length === 0 ? <div className="text-center text-4xl font-semibold mt-20 ">No Products Like 😔😔</div> :
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        Likes
                    </div>
                    <div className="grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4">
                        {data.map((item, index) => {
                            return (
                                <CardLikes removeFavorite={removeFavorite} key={index} data={item} />
                            )
                        })}
                    </div>
                </div >
            }
        </>
    )
}