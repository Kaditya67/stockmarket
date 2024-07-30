import React from 'react';

const Card = ({ title, text, image }) => {
  return (
    <div className="shadow-lg m-4 bg-white text-black rounded-lg" style={{ width: '350px', height: '450px' }}>
      <img className="w-full h-3/4 object-cover" src={image} alt={title} />
      <div className="p-4 h-1/4 flex flex-col justify-between">
        <h5 className="font-bold text-xl mb-2">{title}</h5>
        <p className="text-gray-700 text-sm">{text}</p>
      </div>
    </div>
  );
};

const Cards = () => {
  const data = [
    {
      title: 'Card title 1',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      image: 'https://via.placeholder.com/300x200.png?text=Image+1',
    },
    {
      title: 'Card title 2',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      image: 'https://via.placeholder.com/300x200.png?text=Image+2',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center p-6">
      {data.map((item, index) => (
        <Card key={index} title={item.title} text={item.text} image={item.image} />
      ))}
    </div>
  );
};

export default Cards;
