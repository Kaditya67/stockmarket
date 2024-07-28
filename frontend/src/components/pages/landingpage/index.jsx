import Image from '../../../assets/images/Image.jpg'; 

const Body = () => {
  return (
    <div>
      <div className="bg-[#D1C4E9] mx-35 my-8 p-6 flex flex-col items-center justify-center h-[75vh] rounded-lg shadow-lg">
        <h1 className="text-white text-3xl font-bold mb-4"></h1>
        <img
          src={Image} 
          alt="Stock Market"
          className="w-[60%] h-[70vh] py-7 rounded-[8px] shadow-6xl"
        />
      </div>
    </div>
  );
};

export default Body;
