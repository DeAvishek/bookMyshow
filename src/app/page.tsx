"use client"
import { IShowtime } from "./Model/showtime";
import axios from "axios";
import Moviecard from "@/components/Moviecard";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { ValueContext } from "./context/optionsvalueprovider";
export default function Home() {
  type MovieProps={
    _id:string,
    title:string,
    duration:number,
    language:string,
    descriptions:object,
    posterUrl:string,
    trailerUrl:string,
    releaseDate:Date,
    showtimes:IShowtime[]
    rating:number[]
  }
  const [movies, setmovies] = useState<MovieProps[]>([])
  const [responseMessage,setresponseMessage]=useState('');
  const [loading,setloading]=useState(false)
  const {optionsValue}=useContext(ValueContext)
  const getMovies=async()=>{
    try {
      setloading(true)
      const response=await axios.get('/api/movie/get-movies')
      if(response.status===200){
        setmovies(response.data.movies)
        setresponseMessage(response.data.message)
        console.log(responseMessage)  //todo remove
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        setresponseMessage(error.response?.data?.error ||"Something went to wrong")
        console.log(responseMessage)//todo remove
      }else{
        setresponseMessage("Internal server error")
      }
      
    }finally{
      setloading(false);
    }
  }
 

  useEffect(()=>{
    
    getMovies()
  },[])
  return (
    <div className="bg-pink-200 mt-10 flex flex-col items-center">
  <span className="text-xl font-bold text-gray-800 w-full text-center mt-4">
    Movies that you may like{optionsValue}
  </span>
  <div className="mt-5 mb-5 flex flex-wrap gap-8 sm:items-start justify-center rounded">
    {loading ? (
      <p className="text-lg font-semibold text-gray-700 animate-pulse">Getting best Movies for you...</p>
    ) : (
      movies.map((movie) => (
        <Moviecard
          key={movie._id}
          movieId={movie._id}
          movieTitle={movie.title}
          moviePosterUrl={movie.posterUrl}
          rating={movie.rating}
        />
      ))
    )}
  </div>
</div>

  );
}
