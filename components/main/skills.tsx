import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  MY_SKILLS,
  BASE_SKILL_URL
} from "@/constants";
import useDevice from "@/hooks/useDevice";

export const Skills = () => {
  const { width } = useDevice();

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 max-w-xl max-w flex-wrap h-full relative overflow-hidden"
    >
      <SkillText />

      <div className="flex flex-row justify-around flex-wrap gap-5 items-center max-w-screen-lg px-0">
        {MY_SKILLS
          .slice(0, width > 452 ? MY_SKILLS.length : 12)
          .map((skill, i) => (
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
    </section>
  );
};
