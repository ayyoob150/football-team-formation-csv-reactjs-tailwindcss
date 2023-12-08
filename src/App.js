import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import {createContext } from "react";
import PageNotFound from "./pages/PageNotFound";
import { ContextProvider } from "./context/context";

export const context = createContext(null);

function App() {

// const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime)=>{
//   console.log("id",id, "phase",phase,"actualDuration", actualDuration,"baseDuration", baseDuration,"startTime", startTime,"commitTime", commitTime);
// }
  return (
    // <Profiler id="App" onRender={onRender}>
  <div className="bg-[#1f1f1f] w-full h-full">
    <ContextProvider>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
    </ContextProvider>
    </div>
// </Profiler>
  );
}

export default App;
