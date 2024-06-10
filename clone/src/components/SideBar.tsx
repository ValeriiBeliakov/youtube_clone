import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  ClapperboardIcon,
  Clock,
  Home,
  Library,
  PlaySquare,
  Repeat,
  History,
} from "lucide-react";
import SmallSideBarItem from "./SmallSideBarItem";
import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "./Button";
import { subscriptions } from "../data/sideBar";

import { PageHeaderFirstSection } from "../layout/PageHeader";
import { useSideBarContext } from "../Context/SideBarContext";

const SideBar = () => {
  const { isLargeOpen,isSmallOpen,close} = useSideBarContext();
  return (
    <>
      <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
        <SmallSideBarItem IconOrImg={Home} title="Home" url="/" />
        <SmallSideBarItem IconOrImg={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem
          IconOrImg={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem IconOrImg={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div onClick={close} className="lg:hidden fixed  inset-0 z-[999] bg-secondary-dark opacity-50"/>
      )}
      <aside  className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 p-2   ${isLargeOpen ? "lg:flex" : "lg:hidden" }
       ${isSmallOpen ?  "flex z-[999] bg-white max-h-screen": "hidden"}`}>
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection/>
        </div>
        <LargeSideBarSection visibleItemCount={1}>
          <LargeSideBarItem
            isActive
            IconOrImg={Repeat}
            title="Shorts"
            url="/shorts"
          />
          <LargeSideBarItem
            isActive={false}
            IconOrImg={ClapperboardIcon}
            title="Подписки"
            url="/shorts"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection>
          <LargeSideBarItem
            isActive={false}
            IconOrImg={Library}
            title="Библиотека"
            url="/shorts"
          />
          <LargeSideBarItem
            isActive={false}
            IconOrImg={History}
            title="История"
            url="/shorts"
          />
          <LargeSideBarItem
            isActive={false}
            IconOrImg={PlaySquare}
            title="Ваши видео"
            url="/shorts"
          />
          <LargeSideBarItem
            isActive={false}
            IconOrImg={Clock}
            title="Смотреть позже"
            url="/shorts"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Каналы">
          {subscriptions.map((item) => (
            <LargeSideBarItem
              key={item.id}
              IconOrImg={item.imgUrl}
              title={item.channelName}
              url={`/@${item.id}`}
              isActive={false}
            />
          ))}
        </LargeSideBarSection>
      </aside>
    </>
  );
};

export default SideBar;

type LargeSideBarSection = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSection) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandedButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-4 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center gap-4 p-3 rounded-lg"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "показать мешьше" : "показать больше"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSideBarItemProps = {
  IconOrImg: ElementType | string;
  title: string;
  url: string;
  isActive: boolean;
};
function LargeSideBarItem({
  IconOrImg,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center gap-4 p-3 rounded-lg ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImg === "string" ? (
        <img src={IconOrImg} className="rounded-full w-6 h-6" />
      ) : (
        <IconOrImg className="w-6 h-6" />
      )}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
