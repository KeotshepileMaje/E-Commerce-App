"use client";

import { IconType } from "react-icons";

interface StatusProps {
  text: String;
  icon: IconType;
  bg: String;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`
        ${bg}
        ${color}
        px-1
        rounded
        flex
        items-center
        gap-1
        `}
    >
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
