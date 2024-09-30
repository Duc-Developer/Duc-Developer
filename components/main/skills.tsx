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
      className="flex flex-col items-center justify-center gap-3 max-w-xl max-w flex-wrap h-full relative overflow-hidden"
    >
      <SkillText />

      <div className="flex flex-row justify-around flex-wrap gap-5 items-center max-w-screen-lg px-0">
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
    </section>
  );
};
