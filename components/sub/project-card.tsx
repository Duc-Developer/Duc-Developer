import Image from "next/image";
import './project-card.module.css';

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <>
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-[20em] mx-auto object-contain"
      />

      <div className="relative p-4">
        <h3 className="text-xl font-semibold text-outline">{title}</h3>
        <p className="mt-2 text-gray-300 text-outline">{description}</p>
      </div>
    </>
  );
};
