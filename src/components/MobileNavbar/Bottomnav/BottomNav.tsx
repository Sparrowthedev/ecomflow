import Link from "next/link";
import { useState } from "react";
import Logout from "./Logout";
import { buttons } from '../../../lib/random'

interface NavbarProps {
  isVisible: boolean;
}

const BottomNavbar: React.FC<NavbarProps> = ({ isVisible }) => {

  const [activeButton, setActiveButton] = useState<number>(1);

  

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  return (
    <div className="bg-[#1f213a] block lg:hidden">
      <div
        className={`fixed bottom-0 rounded-t-3xl px-7 left-0 right-0 max-w-7xl my-0 mx-auto bg-[#1f213a] p-4 text-white transform ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } transition-transform`}
      >
        <nav className="flex justify-between">
          {buttons.map((button) => (
            <Link
              key={button.id}
              onClick={() => handleButtonClick(button.id)}
              href={button.href}
              className={`flex flex-col items-center justify-center text-[12px] ${
                activeButton === button.id ? "text-[#7b5ef8]" : ""
              }`}
            >
              {button.icon}

              {button.label}
            </Link>
          ))}
          <Logout />
        </nav>
      </div>
    </div>
  );
};

export default BottomNavbar;
