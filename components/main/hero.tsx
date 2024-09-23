import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-26em] left-0 w-full h-screen object-cover -z-20"
      >
        <source src="https://res.cloudinary.com/drwgmpzuh/video/upload/v1726709398/videos/blackhole_vlnyv4.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};
