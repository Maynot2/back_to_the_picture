
const Mosaique = ({ pictures }) => {
    return (
        <>
            {
                pictures.map((obj) => {
                    return (<img  className="transform border-2 rounded  m-2 border-2 border-tertiary w-auto h-56" src={obj.image}></img>
                    )
                })
            }
        </>
    )
}
export default Mosaique;
