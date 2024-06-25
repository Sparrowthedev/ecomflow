"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { buttons } from "../../lib/random";
import { logout } from "@/lib/lib";
import { useRouter } from "next/navigation";

const SideNav: React.FC = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<number>(1);

  const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await logout();
    router.push("/");
    router.refresh();
  };

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  return (
    <div className="text-white w-[20%] pt-4 px-3 border-r border-[grey] fixed top-0 bottom-0 left-0 ">
      <div className="pl-6">
        <Link href="/dashboard" className="text-[#ff5900] font-bold text-xl">
          ecomflow
        </Link>
      </div>

      <div className="mt-6 pl-3">
        <ul className="flex flex-col gap-4">
          {buttons.map((button) => (
            <li key={button.id} onClick={() => handleButtonClick(button.id)}>
              <Link
                href={button.href}
                className={`flex items-center gap-2 p-2 rounded-md ${
                  activeButton === button.id
                    ? "text-[#ff5900] bg-[#363535]"
                    : ""
                }`}
              >
                {button.icon} {button.label}
              </Link>
            </li>
          ))}
          <li className="p-2 flex items-center gap-2 hover:bg-[#363535] rounded-md hover:text-[#ff5900]">
            <form onSubmit={handleLogout}>
              <button type="submit" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[25px] h-[25px] cursor-pointer"
                >
                  <path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path>
                </svg>
                Signout
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
