import { Introduction } from "@/components/main/Introduction";
import AstronautModel from "@/components/sub/astronaut-model";

const modelURL = "https://res.cloudinary.com/drwgmpzuh/image/upload/v1727593616/models/Astronaut_in_Space__0929060657_t1vxp7.glb"
export default function Home() {

  return (
    <div className="h-full md:pt-4 px-4 flex flex-col xl:flex-row gap-4 relative">
      <div>
        <Introduction />
      </div>
      <div className="grow h-full">
        <AstronautModel
          modelUrl={modelURL}
        />
      </div>
    </div>
  );
}
