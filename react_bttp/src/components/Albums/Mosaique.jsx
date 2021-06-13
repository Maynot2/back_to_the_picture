const Mosaique = ({ pictures }) => {
  return (
    <>
      {pictures.map((url) => {
        console.log(url);
        return (
          <img
            className="transform border-2 rounded  m-2 border-2 border-tertiary w-auto h-56"
            src={url}
          ></img>
        );
      })}
    </>
  );
};
export default Mosaique;
