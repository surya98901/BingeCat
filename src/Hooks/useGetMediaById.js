
import { useDispatch } from "react-redux";
import { addTrailer } from "../store/slices/moviesSlice";
import { API_OPTIONS } from "../assets/constants";
import { useState, useEffect } from "react";


const useGetMediaById = (mediaType, mediaId) => {

    const [media, setMedia] = useState({ video: null, images: null });

    const getvideo = async (id) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
            API_OPTIONS
        );
        const data = await response.json();
        setMedia((prev) => ({ ...prev, video: data }));
    };
    const getImages = async (id) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/images?language=en-US`,
            API_OPTIONS
        );
        const data = await response.json();
        setMedia((prev) => ({ ...prev, images: data }));
    };

    useEffect(() => { if(mediaId){
        getvideo(mediaId);
        getImages(mediaId);
    }}, [   mediaId, mediaType]);
    return media;
};

export default useGetMediaById;