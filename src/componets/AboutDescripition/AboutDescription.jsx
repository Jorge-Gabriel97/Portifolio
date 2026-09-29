import { FaReact, FaPython, FaJava, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiSpringboot, SiPostgresql, SiMysql, SiMongodb } from "react-icons/si";
import Reveal from "../../Utils/Reveal";

const STACK_GROUPS = [
    {
        label: "Front-end",
        items: [
            { icon: FaReact, name: "React", color: "#61DAFB" },
            { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
            { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
            { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
            { icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
        ],
    },
    {
        label: "Back-end",
        items: [
            { icon: FaJava, name: "Java", color: "#ED8B00" },
            { icon: SiSpringboot, name: "Spring Boot", color: "#6DB33F" },
            { icon: FaNodeJs, name: "Node.js", color: "#339933" },
            { icon: FaPython, name: "Python", color: "#3776AB" },
        ],
    },
    {
        label: "Dados & Infra",
        items: [
            { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
            { icon: SiMysql, name: "MySQL", color: "#4479A1" },
            { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
            { icon: FaGitAlt, name: "Git", color: "#F05032" },
            { icon: FaDocker, name: "Docker", color: "#2496ED" },
        ],
    },
];

function AboutDescription() {
    return (
        <div className="py-20 md:py-28">
            <Reveal className="max-w-3xl">
                <h2 className="font-serif text-3xl text-slate-900 dark:text-white md:text-4xl">
                    Desenvolvedor Full Stack
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    Graduando em Análise e Desenvolvimento de Sistemas, construindo software com engenharia e Clean Code em cada camada: interfaces em React/TypeScript, APIs em Java (Spring Boot) e Node.js, automações em Python, e persistência em SQL e NoSQL — tudo versionado e containerizado para rodar igual do meu ambiente até a produção.
                </p>
            </Reveal>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
                {STACK_GROUPS.map((group, index) => (
                    <Reveal key={group.label} delay={index * 0.1}>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{group.label}</h3>
                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-5">
                            {group.items.map((item) => {
                                const IconComp = item.icon;
                                return (
                                    <div key={item.name} className="flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1.5">
                                        <IconComp size={36} color={item.color} />
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    )
}

export default AboutDescription;
