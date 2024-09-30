import { Swiper, SwiperSlide } from 'swiper/react';
import { PROJECTS } from "@/constants";

import { ProjectCard } from '../sub/project-card';
import { Pagination, Autoplay } from 'swiper/modules';
import './projects.module.css';

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center"
    >
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue py-2">
        My Projects
      </h3>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination]}
        className="project-swiper w-[36rem] h-full mt-2"
      >
        {PROJECTS.map((project) => (<SwiperSlide
          key={project.title}
        >
          <ProjectCard
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
