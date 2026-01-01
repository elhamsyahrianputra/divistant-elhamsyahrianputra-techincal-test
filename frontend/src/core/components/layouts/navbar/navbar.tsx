import Image from "next/image";
import { useSidebarStore } from "@/core/store/use-sidebar.store";

export default function Navbar() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-1000 flex h-16 justify-between bg-white/80 px-4 backdrop-blur-xs sm:px-6 xl:h-18 xl:px-10">
      <div className="flex items-center">
        <button
          className="cursor-pointer rounded-full transition-colors ease-in-out hover:bg-gray-500/8 xl:hidden"
          onClick={() => toggleSidebar()}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="text-center text-gray-600"
            height={24}
            role="img"
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M15.7798 4.5H5.2202C4.27169 4.5 3.5 5.06057 3.5 5.75042C3.5 6.43943 4.27169 7 5.2202 7H15.7798C16.7283 7 17.5 6.43943 17.5 5.75042C17.5 5.06054 16.7283 4.5 15.7798 4.5Z"
              fill="currentColor"
              opacity="0.4"
            ></path>
            <path
              d="M18.7798 10.75H8.2202C7.27169 10.75 6.5 11.3106 6.5 12.0004C6.5 12.6894 7.27169 13.25 8.2202 13.25H18.7798C19.7283 13.25 20.5 12.6894 20.5 12.0004C20.5 11.3105 19.7283 10.75 18.7798 10.75Z"
              fill="currentColor"
            ></path>
            <path
              d="M15.7798 17H5.2202C4.27169 17 3.5 17.5606 3.5 18.2504C3.5 18.9394 4.27169 19.5 5.2202 19.5H15.7798C16.7283 19.5 17.5 18.9394 17.5 18.2504C17.5 17.5606 16.7283 17 15.7798 17Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
      <ul className="flex items-center gap-1.5">
        <li>
          <button
            className="flex size-10 items-center justify-center"
            type="button"
          >
            <svg
              aria-hidden="true"
              className="animate-spin [animation-duration:9s]"
              focusable="false"
              height={24}
              viewBox="0 0 24 24"
              width={24}
            >
              <path
                d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083"
                fill="#637381"
                opacity="0.4"
              ></path>
              <path
                d="M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3"
                fill="#637381"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className="relative flex size-10 items-center justify-center"
            type="button"
          >
            <span className="absolute block size-10 animate-spin rounded-full bg-gradient-to-r from-warning via-gray-500 to-primary [animation-duration:8s]"></span>
            <Image
              alt="Jaydon Frankie"
              className="relative z-10 box-content rounded-full bg-white from-0% via-45% to-55% p-0.5"
              height={34}
              src="/img/avatar.webp"
              width={34}
            ></Image>
          </button>
        </li>
      </ul>
    </header>
  );
}
