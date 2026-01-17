import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#8f9294]">
      {/* Top markers */}
      <div className="pointer-events-none absolute left-6 top-6 text-sm text-white/80">© Otavio Emanoel de Lima</div>
      <nav className="absolute right-8 top-6 flex gap-8 text-sm text-white/80">
        <a href="#work" className="hover:text-white">Work</a>
        <a href="#about" className="hover:text-white">About</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>

      {/* Left badge */}
      <div className="pointer-events-none absolute left-0 top-40 pl-2">
        <div className="flex items-center gap-4 rounded-3xl bg-black/30 px-4 py-3 text-white backdrop-blur-sm shadow-xl">
          <div className="leading-tight">
            <div className="text-xs opacity-80">Located in</div>
            <div className="text-sm">Brazil</div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Image src="/globe.svg" alt="Globe" width={22} height={22} />
          </div>
        </div>
      </div>

      {/* Main hero grid */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_1fr] md:pt-24">
        {/* Photo */}
        <div className="order-2 flex justify-center md:order-1">
          <div className="relative aspect-3/4 w-md max-w-full overflow-hidden rounded-2xl bg-black/10 shadow-2xl ring-1 ring-black/20">
            <Image src="/me.png" alt="Foto" fill priority sizes="(min-width: 768px) 28rem, 80vw" className="object-cover object-top" />
          </div>
        </div>

        {/* Text + arrow */}
        <div className="order-1 md:order-2">
          <div className="mb-6 text-right text-white">
            <div className="mb-2 text-xl opacity-80">↘</div>
            <div className="text-2xl">Freelance</div>
            <div className="text-2xl">Designer & Developer</div>
          </div>
        </div>
      </div>

      {/* Big name at bottom */}
      <div className="pointer-events-none select-none">
        <h1 className="mx-auto max-w-7xl px-6 pb-2 text-[15vw] leading-none tracking-tight text-white/90 md:text-[9rem]">
          Otavio Emanoel
        </h1>
      </div>
    </section>
  );
}
