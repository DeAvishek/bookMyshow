"use client"
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { useParams } from "next/navigation";
import { useState } from "react";
import React from 'react'
import { Button } from "@/components/ui/button";

const page = () => {
    const [loading, setloading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    type formValue = {
        screen: number,
        time: string,
        seatAvailable: number,
        price: number,
    }
    //getting the params of movie name
    const { movieid } = useParams()
    const { register, handleSubmit, reset,formState: { errors } } = useForm<formValue>({
        defaultValues: {
            screen: 0,
            time:"",
            seatAvailable: 0,
            price: 0

        }
    })
    const router= useRouter();
    
    const handeAddShowtime = async (data: formValue) => {
        try {
            setloading(true);
            const response = await axios.post(`/api/movie/${movieid}/add-showtime-server`, data)
            if (response.status === 200) {
                setResponseMessage(response.data.message)
                reset()  //resest the form
                console.log(responseMessage) //todo to remove
                router.push("/") //todo to modify
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseMessage(error.response?.data.error || "Error occur  during add show time")
            } else {
                setResponseMessage("Error occur  during add show time");
            }
        } finally {
            setloading(false);
        }
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <div className="w-full max-w-lg p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Add Showtime for {movieid}</h1>
                    <form onSubmit={handleSubmit(handeAddShowtime)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-white">Screen:</label>
                            <input type="number"
                            placeholder="Enter Screen number.." 
                            {...register("screen",{required:"Screen number is required"})}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.screen && <p className="text-red-300 text-sm">{errors.screen.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">ShowTime:</label>
                            <input type="time"
                            placeholder="Enter Show-time.." 
                            {...register("time",{required:"Show-time is required"})}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.time && <p className="text-red-300 text-sm">{errors.time.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">SeatAvailable:</label>
                            <input type="number"
                            placeholder="Available seat.." 
                            {...register("seatAvailable",{required:"This filed is required"})}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.seatAvailable && <p className="text-red-300 text-sm">{errors.seatAvailable.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">Price:</label>
                            <input type="number"
                            placeholder="Enter Price" 
                            {...register("price",{required:"Price is required"})}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.price && <p className="text-red-300 text-sm">{errors.price.message}</p>}
                        </div>
                        <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 mt-4 font-semibold text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                        >
                            Add showtime
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
