import { FaYoutube, FaFacebook, FaMailBulk, FaSkype, FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import {
  RxGithubLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export const CONTACTS = [
  {
    name: "Skype",
    icon: FaSkype,
    link: "https://join.skype.com/invite/uzEhCJj4aXEd",
    visibleMode: "all"
  },
  {
    name: "Telegram",
    icon: FaTelegramPlane,
    link: "https://t.me/ductrantrung",
    visibleMode: "all"
  },
  {
    name: "Mail",
    icon: MdEmail,
    link: "mailto:mrtranduc1994@gmail.com",
    visibleMode: "expanded"
  }
] as const;

export const SOCIALS = [
  {
    name: "Linkedin",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/david-chan-0b7103212",
    visibleMode: "all"
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://www.facebook.com/PoPeooo/",
    visibleMode: "all"
  },
  {
    name: "Github",
    icon: FaGithub,
    link: "https://github.com/Duc-Developer",
    visibleMode: "expanded"
  },
  {
    name: "Youtube",
    icon: FaYoutube,
    link: "#sorry-not-available",
    visibleMode: "expanded"
  }
] as const;

export const BASE_SKILL_URL = 'https://skillicons.dev/icons';

export const MY_SKILLS = [
  { id: "1", name: "ReactJS", tag: "react", width: 45, height: 45 },
  { id: "2", name: "NextJS", tag: "nextjs", width: 45, height: 45 },
  { id: "3", name: "NodeJS", tag: "nodejs", width: 45, height: 45 },
  { id: "4", name: "HTML", tag: "html", width: 45, height: 45 },
  { id: "5", name: "CSS", tag: "css", width: 45, height: 45 },
  { id: "6", name: "JavaScript", tag: "js", width: 45, height: 65 },
  { id: "7", name: "TypeScript", tag: "ts", width: 45, height: 45 },
  { id: "8", name: "Vite", tag: "vite", width: 45, height: 45 },
  { id: "9", name: "BunJS", tag: "bun", width: 45, height: 45 },
  { id: "10", name: "Git", tag: "git", width: 45, height: 45 },
  { id: "12", name: "Tailwind", tag: "tailwind", width: 45, height: 45 },
  { id: "13", name: "GitHub", tag: "github", width: 45, height: 45 },
  { id: "14", name: "GitLab", tag: "gitlab", width: 45, height: 45 },
  { id: "15", name: "MUI", tag: "mui", width: 45, height: 45 },
  { id: "16", name: "MySQL", tag: "mysql", width: 45, height: 45 },
  { id: "17", name: "MongoDB", tag: "mongodb", width: 45, height: 45 },
  { id: "18", name: "Postgres", tag: "postgres", width: 45, height: 45 },
  { id: "19", name: "Postman", tag: "postman", width: 45, height: 45 },
  { id: "20", name: "Redux", tag: "redux", width: 45, height: 45 },
  { id: "21", name: "Rollup", tag: "rollup", width: 45, height: 45 },
  { id: "22", name: "Webpack", tag: "webpack", width: 45, height: 45 },
  { id: "23", name: "Npm", tag: "npm", width: 45, height: 45 },
  { id: "24", name: "Yarn", tag: "yarn", width: 45, height: 45 },
  { id: "25", name: "Workers", tag: "workers", width: 45, height: 45 },
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
    link: "/?active=about-me",
  },
  {
    title: "Skills",
    link: "/?active=skills",
  },
  {
    title: "Projects",
    link: "/?active=projects",
  },
  {
    title: "Blogs",
    link: "/blogs",
    backLink: "https://codecungdavid.blogspot.com"
  },
] as const;
