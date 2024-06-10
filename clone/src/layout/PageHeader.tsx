import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/logo.svg";
import Button from "../components/Button";
import { useState } from "react";
import {useSideBarContext } from "../Context/SideBarContext";
const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
     <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center items-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch &&(
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="flex-shrink"
          onClick={()=>setShowFullWidthSearch(false)}
        >
          <ArrowLeft />
        </Button>)}
        <div className="flex flex-grow max-w-[600px] ">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border-secondary-border border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none "
          />
          <Button
            type="submit"
            className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
          >
            <Search />
          </Button>
        </div>

        <Button type="button" size="icon" className="flex-shrink">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 items-center md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

type PageHeaderFirstSectionProps = {
  hidden?: boolean
}
export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSideBarContext()

  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" >
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-10" />
      </a>
    </div>
  )
}
export default PageHeader;
