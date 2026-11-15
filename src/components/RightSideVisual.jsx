
import Image from "next/image";

const RightSideVisual = () => {
  return (
    <section className="relative hidden h-full min-h-0 flex-col items-center justify-center overflow-hidden border-l border-slate-100 bg-[#fafbfc] px-6 lg:flex xl:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(226,232,240,0.28),_transparent_70%)]" />
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <h2 className="text-xl font-semibold tracking-tight xl:text-2xl">
          Select &amp; Combine &amp; Integrate.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 xl:text-base">
          Develop and refine AI models using our intuitive interface.
        </p>
        <div className="mt-8 flex w-full justify-center xl:mt-10">
          <div className="relative aspect-square w-full max-w-[400px]">
            <Image
              src="/image.png"
              alt="AI services connected in a network"
              width={800}
              height={800}
              quality={100}
              priority
              sizes="(max-width: 1024px) 0px, (max-width: 1280px) 400px, 400px"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-4 text-center text-xs text-slate-400 xl:bottom-6 xl:text-sm">
        One workspace. Multiple AI possibilities.
      </p>
    </section>
  );
};
export default RightSideVisual;