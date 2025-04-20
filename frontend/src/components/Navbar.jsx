import { MdWavingHand } from "react-icons/md";
import { BiX } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Image } from "./Image.jsx";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="Lama Logo" w="32" h="32" />
        <span>LamaLog</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MENU BUTTON */}
        <div onClick={() => setMenu(!menu)} className="cursor-pointer">
          {menu ? (
            <BiX className="text-4xl" />
          ) : (
            <AiOutlineMenu className="text-3xl" />
          )}
        </div>

        {/* MOBILE MENU LIST */}
        <div
          className={`w-full bg-white h-screen gap-8 text-lg font-medium flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out ${
            menu ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/about">About</Link>

          <SignedOut>
            <Link to="/login">
              <button className="flex gap-1 py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Login <MdWavingHand className="text-yellow-500 text-xl pt-1" />
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/about">About</Link>

        <SignedOut>
          <Link to="/login">
            <button className="flex gap-1 py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login <MdWavingHand className="text-yellow-500 text-xl pt-1" />
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
