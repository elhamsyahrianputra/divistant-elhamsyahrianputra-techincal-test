import Image from "next/image";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-9999 flex h-16 w-full items-center bg-white/80 px-4 backdrop-blur-[6px] md:px-6 lg:fixed lg:h-18 lg:bg-transparent lg:backdrop-blur-none">
        <div>
          <Image
            alt="Spacio Logo"
            height={40}
            src="/img/logo/logo-blue.svg"
            width={40}
          />
        </div>
      </header>
      <main className="flex lg:h-dvh">{children}</main>
    </>
  );
}
