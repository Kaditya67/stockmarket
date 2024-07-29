import { useEffect, useState } from 'react';
import Image from '../../../assets/images/Image.jpg';
import Image2 from '../../../assets/images/Image2.webp';
import Image3 from '../../../assets/images/Image3.webp';

const Body = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const triggerElement = document.getElementById('images-section');
    const endElement = document.getElementById('images-end');
    if (triggerElement && endElement) {
      const scrollTop = window.scrollY;
      const offsetTop = triggerElement.offsetTop;
      const offsetBottom = endElement.offsetTop - window.innerHeight;

      if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-800 to-[#1BE7FF] my-8 p-8 flex flex-col items-center justify-center h-[75vh] shadow-xl">
        <h1 className="text-white text-4xl font-bold mb-6">Welcome to Our Trading Platform</h1>
        
        <button className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
          Discover the Power of Investing Today!
        </button>
      </div>

      {/* Sticky Wrapper */}
      <div className={`relative ${isSticky ? 'sticky top-0 bg-black z-10 shadow-md' : ''}`}>
        <div className="flex justify-center py-4 bg-[#F4F4F9]-900">
          <div className="flex space-x-20">
            <span className="text-black text-3xl font-semibold ">Invest in Best with Us</span>
          </div>
        </div>
      </div>

      <div id="images-section" className="flex justify-center items-center mt-8">
        <div className="flex w-full max-w-4xl">
          <div className="w-[60%] p-4">
            <div className="relative w-full h-[60vh] overflow-hidden rounded-[7px] shadow-lg">
              <img
                src={Image2}
                alt="Invest Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-[40%] p-4 flex flex-col items-center justify-center">
            <p className="text-[#201E1F]-200 text-xl font-bold mb-4">Invest like a pro</p>
            <ul className="text-[#201E1F]-300 text-lg list-disc list-inside space-y-2">
              <li>Research and analyze market trends</li>
              <li>Diversify your investment portfolio</li>
              <li>Set clear investment goals and stick to them</li>
              <li>Stay updated with financial news</li>
              <li>Consult with financial advisors when needed</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="images-end" className="flex justify-center items-center mt-8 p-8">
        <div className="flex w-full max-w-4xl">
          <div className="w-[40%] p-4 flex flex-col items-center justify-center">
            <p className="text-[#201E1F]-200 text-xl font-bold mb-4">This site is pro for traders</p>
            <ul className="text-[#201E1F]-300 text-lg list-disc list-inside space-y-2">
              <li>Use technical analysis for better decision-making</li>
              <li>Keep track of trading volumes and price trends</li>
              <li>Implement risk management strategies</li>
              <li>Practice trading with a demo account</li>
              <li>Stay disciplined and avoid emotional trading</li>
            </ul>
          </div>
          <div className="w-[60%] p-4">
            <div className="relative w-full h-[60vh] overflow-hidden rounded-[7px] shadow-lg">
              <img
                src={Image3}
                alt="Trade Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
