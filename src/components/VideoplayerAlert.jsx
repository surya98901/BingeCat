const BackGroundVideo = ({movie}) => {
    return (
        <div className="background-video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/qELgQUeL8tE?si=m9ZO0kR6LKf1dpRJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    )
}   
export default BackGroundVideo;