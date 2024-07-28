import Navbar from './components/layout/Navbar'
import Index from './components/pages/landingpage/index'
function App() {
  return (
    <>
      <Navbar/>
      <div className="relative">
        <div className="border-t-8 border-[#673AB7] relative">
          <h1 className="absolute inset-x-0 top-0 flex justify-center transform -translate-y-1/2 bg-[#673AB7] px-1 py-1 text-white text-1xl font-bold">
            Track your stock here
          </h1>
        </div>
      </div>
      <Index />
    </>
  );
}

export default App;
