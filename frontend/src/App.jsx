import Navbar from './components/layout/Navbar';
import Index from './components/pages/landingpage/index';

function App() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="border-t-8 border-[#673AB7] sticky top-16 z-40 bg-white">
          <h1 className="flex justify-center bg-[#673AB7] px-1 py-1 text-white text-1xl font-bold">
            Track your stock here
          </h1>
        </div>
      </div>
      <Index />
    </>
  );
}

export default App;
