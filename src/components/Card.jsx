const Card = ({ image, selected, onClick }) => {
  return (
    <div className='card'>
      <div className={selected && "selected"}>
        <img alt='card face' src={image} className='card-face' />

        <img
          alt='card back'
          className='card-back'
          src={"/assets/questionmark.png"}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;
