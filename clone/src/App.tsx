import { useState } from "react";
import "./App.css";
import Categories from "./components/Categories";
import { categories, videos } from "./data/home";
import PageHeader from "./layout/PageHeader";
import VideoGridItem from "./components/VideoGridItem";
import SideBar from "./components/SideBar";
import { SideBarProvider } from "./Context/SideBarContext";

function App() {
  const [selectedCategory,setSelectedCategory] = useState(categories[0])
  return (
    <SideBarProvider>
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] overflow-auto flex-grow">
      <SideBar/>
      <div className="overflow-x-hidden px-8 pb-4">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <Categories categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory}/>
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {videos.map((video)=>(
          <VideoGridItem  {...video} key={video.id}/>
        ))}
        
      </div>
      </div>
      </div>
    </div>
    </SideBarProvider>
  );
}

export default App;
