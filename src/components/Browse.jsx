
import MovieContainer from "./MovieContainer";
import Banner from "./Banner";

const genes = [  "topRated","nowPlaying" ,"popular", "upcoming"];
const Browse = ({ type })=>{
     const containerType = type === "movie" ? "movie" : "series";
    return (
        <div className="browse-page relative  min-h-screen ">
            <Banner type={containerType} />
            
            {genes.map((gene) => (
                <MovieContainer key={gene} gene={gene} type={containerType} />
            ))}
            
        </div>
    )
}
export default Browse; 