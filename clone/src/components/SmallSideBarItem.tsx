import { twMerge } from "tailwind-merge";
import { ElementType } from "react";
import { buttonStyles } from "./Button";

type SmallSideBarItemProps = {
    IconOrImg:ElementType | string
    title:string 
    url:string
}
const SmallSideBarItem = ({IconOrImg,title,url}:SmallSideBarItemProps) => {
    return (
        <a href={url} className={twMerge(buttonStyles({variant:'ghost'}),'py-4 px-1 flex flex-col items-center rounded-lg gap-1')}>
            <IconOrImg className="w-6 h-6"/>
            <div className="text-sm">{title}</div>
        </a>
    );
};

export default SmallSideBarItem;