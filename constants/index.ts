import { FaYoutube, FaFacebook, FaMailBulk, FaSkype, FaTelegram } from "react-icons/fa";
import {
  RxGithubLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { SiZalo } from "react-icons/si";

export const SOCIALS = [
  {
    name: "Zalo",
    icon: SiZalo,
    link: "https://zalo.me/0943862358",
  },
  {
    name: "Telegram",
    icon: FaTelegram,
    link: "https://t.me/ductrantrung",
  },
  {
    name: "Skype",
    icon: FaSkype,
    link: "https://join.skype.com/invite/uzEhCJj4aXEd",
  },
] as const;

export const BASE_SKILL_URL = 'https://skillicons.dev/icons';

export const MY_SKILLS = [
  { id: "1", name: "ReactJS", tag: "react", width: 80, height: 80 },
  { id: "2", name: "NextJS", tag: "nextjs", width: 80, height: 80 },
  { id: "3", name: "NodeJS", tag: "nodejs", width: 80, height: 80 },
  { id: "4", name: "HTML", tag: "html", width: 80, height: 80 },
  { id: "5", name: "CSS", tag: "css", width: 80, height: 80 },
  { id: "6", name: "JavaScript", tag: "js", width: 65, height: 65 },
  { id: "7", name: "TypeScript", tag: "ts", width: 80, height: 80 },
  { id: "8", name: "Vite", tag: "vite", width: 80, height: 80 },
  { id: "9", name: "BunJS", tag: "bun", width: 80, height: 80 },
  { id: "10", name: "Git", tag: "git", width: 80, height: 80 },
  { id: "12", name: "Tailwind", tag: "tailwind", width: 80, height: 80 },
  { id: "13", name: "GitHub", tag: "github", width: 80, height: 80 },
  { id: "14", name: "GitLab", tag: "gitlab", width: 80, height: 80 },
  { id: "15", name: "MUI", tag: "materialui", width: 80, height: 80 },
  { id: "15", name: "MySQL", tag: "mysql", width: 80, height: 80 },
  { id: "15", name: "MongoDB", tag: "mongodb", width: 80, height: 80 },
  { id: "15", name: "Postgres", tag: "postgres", width: 80, height: 80 },
  { id: "15", name: "Postman", tag: "postman", width: 80, height: 80 },
  { id: "15", name: "Redux", tag: "redux", width: 80, height: 80 },
  { id: "15", name: "Rollup", tag: "rollupjs", width: 80, height: 80 },
  { id: "15", name: "Webpack", tag: "webpack", width: 80, height: 80 },
  { id: "15", name: "Npm", tag: "npm", width: 80, height: 80 },
  { id: "15", name: "Yarn", tag: "yarn", width: 80, height: 80 },
  { id: "15", name: "Workers", tag: "workers", width: 80, height: 80 },
] as const;


export const PROJECTS = [
  {
    title: "Modern Next.js 14 Portfolio",
    description:
      'Embark on a journey through my professional evolution with the "Modern Next.js Portfolio" - a dynamic showcase of my skills, experiences, and passion for web development. Crafted with precision and powered by Next.js, this portfolio is more than just a static display; it\'s an immersive experience that reflects the cutting edge of modern web technologies.',
    image: "/projects/project-1.png",
    link: "https://example.com",
  },
  {
    title: "Interactive Cards Portfolio",
    description:
      'Step into the extraordinary world of my professional journey through the "Interactive Cards Portfolio" - an innovative and visually captivating platform that redefines the traditional portfolio experience. Ditching the conventional static layout, this portfolio leverages interactive cards to showcase my skills, projects, and personality in an engaging and dynamic manner.',
    image: "/projects/project-2.png",
    link: "https://example.com",
  },
  {
    title: "Space Themed Website",
    description:
      'Embark on an interstellar journey with my "Space Themed Website", a mesmerizing space-themed website that invites you to explore the cosmic wonders beyond our world. Immerse yourself in an awe-inspiring digital experience that blends cutting-edge design with the mysteries of the universe.',
    image: "/projects/project-3.png",
    link: "https://example.com",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/Duc-Developer",
      }
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Facebook",
        icon: FaFacebook,
        link: "https://www.facebook.com/PoPeooo",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/david-chan-0b7103212",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Learning about me",
        icon: null,
        link: "#about",
      },
      {
        name: "Mail to Me",
        icon: FaMailBulk,
        link: "mailto:mrtranduc1994@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Blogs",
    link: "#blogs",
  },
] as const;
