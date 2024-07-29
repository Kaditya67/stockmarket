import Navbar from "./components/layout/Navbar";
import Index from "./components/pages/landingpage/index";
import Charts from "./components/pages/landingpage/Charts";
import Graph from "./components/pages/landingpage/Graph";

function App() {
  return (
    <>
      <Navbar />
      {/* <div className="relative">
        <h1 className="flex justify-center bg-[#222222] px-1 py-3 text-white text-1xl">
          Track your stock here
        </h1>
      </div> */}
      <Index />
      <Charts />
      <Graph />
    </>
  );
}

export default App;
