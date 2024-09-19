import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  MY_SKILLS,
  BASE_SKILL_URL
} from "@/constants";

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center max-w-screen-lg">
        {MY_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.id}
            src={`${BASE_SKILL_URL}?i=${skill.tag}`}
            name={skill.name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="https://res.cloudinary.com/drwgmpzuh/video/upload/v1726709399/videos/skills-bg_fmvnwj.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
