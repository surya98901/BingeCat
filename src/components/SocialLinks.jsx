

const socialLinks  = ({lst})=>{
    return (
        <div>
            {lst.map((item) => { return <p>{item}</p>; })}
        </div>
    )
}
export default socialLinks;