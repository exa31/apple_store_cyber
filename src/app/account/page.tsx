'use client';

import { useSession } from "next-auth/react";

export default function Profile() {

    const { data } = useSession();

    return (
        <div className="flex flex-row mx-10  sm:w-full overflow-auto justify-between">
            <div className="w-1/2">
                <p className="text-xl py-4 border-b-2 font-semibold">Name</p>
                <p className="text-lg py-4">{data?.user?.name}</p>
            </div>
            <div className="w-1/2">
                <p className="text-xl py-4 border-b-2 font-semibold">Email</p>
                <p className="text-lg py-4">{data?.user?.email}</p>
            </  div>
        </div>
    )
};