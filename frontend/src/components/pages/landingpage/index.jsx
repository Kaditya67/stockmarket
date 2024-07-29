import Image from '../../../assets/images/Image.jpg';
import Image2 from '../../../assets/images/Image2.webp';
import Image3 from '../../../assets/images/Image3.webp';

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
      <div className="flex justify-center p-6">
        <div className="flex space-x-20">
          <span className="text-purple-800 text-2xl font-semibold">Invest</span>
          <span className="text-purple-800 text-2xl font-semibold">Trade</span>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="flex w-full max-w-4xl">
          <div className="w-[60%] p-4">
            <img
              src={Image2}
              alt="Invest Image"
              className="w-full h-[60vh] object-cover rounded-[7px] shadow-lg"
            />
          </div>
          <div className="w-[40%] p-4 flex items-center justify-center">
            <p className="text-gray-800 text-lg">
              In the world of stocks,<br />
              We find our path,<br />
              To invest in dreams,<br />
              And trade for laughs.<br /><br />
              With markets high,<br />
              And markets low,<br />
              We seek the gains,<br />
              And let courage grow.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 p-8">
        <div className="flex w-full max-w-4xl">
          <div className="w-[60%] p-4">
            <img
              src={Image3} alt="Trade Image"
              className="w-full h-[60vh] object-cover rounded-[7px] shadow-lg"
            />
          </div>
          <div className="w-[40%] p-4 flex items-center justify-center">
            <p className="text-gray-800 text-lg">
              In the world of stocks,<br />
              We find our path,<br />
              To invest in dreams,<br />
              And trade for laughs.<br /><br />
              With markets high,<br />
              And markets low,<br />
              We seek the gains,<br />
              And let courage grow.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Body;
