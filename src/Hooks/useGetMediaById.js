
import { API_OPTIONS } from "../assets/constants";
import { useState, useEffect } from "react";

const useGetMediaById = (mediaId,mediaType ) => {
  const [media, setMedia] = useState({ video: null, images: null });

  useEffect(() => {
    if (!mediaId) return;

    const fetchMedia = async () => {
      try {
        const [videoRes, imagesRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/${mediaType}/${mediaId}/images?language=en-US`,
            API_OPTIONS
          ),
        ]);

        const videoData = await videoRes.json();
        const imagesData = await imagesRes.json();

        setMedia({ video: videoData, images: imagesData });
      } catch {
        // Silently catch network or parsing errors
      }
    };

    fetchMedia();
  }, [mediaId, mediaType]);

  return media;
};

export default useGetMediaById;