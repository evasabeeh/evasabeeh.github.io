import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import { FaChevronRight, FaGithub, FaCode } from "react-icons/fa";
import { LuLinkedin, LuMouse } from "react-icons/lu";
import Container from "@/components/Container";
import styles from "@/styles/Home.module.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { aboutStats, projects, skills, experiences, education, intro, heroDescription, socialLinks, pills } from "@/constants";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <span>Loading...</span>,
});

export default function Home() {
  const refScrollContainer = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canRenderSpline, setCanRenderSpline] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPos = window.scrollY + 300;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute("id") ?? "";
        }
      });
      navLinks.forEach((li) => {
        li.classList.remove("nav-active");
        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  useEffect(() => {
    const initializeTilt = () => {
      const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
      const profileTilt: HTMLElement[] = Array.from(document.querySelectorAll("#profile-tilt"));
      if (tilt.length > 0) {
        VanillaTilt.init(tilt, {
          speed: 300,
          glare: true,
          "max-glare": 0.1,
          gyroscope: true,
          perspective: 900,
          scale: 0.9,
        });
      }
      if (profileTilt.length > 0) {
        VanillaTilt.init(profileTilt, {
          speed: 400,
          glare: true,
          "max-glare": 0.15,
          gyroscope: true,
          perspective: 1000,
          scale: 1.02,
          max: 15,
        });
      }
    };
    initializeTilt();
    const timer = setTimeout(initializeTilt, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (gl && typeof gl.getParameter === "function") setCanRenderSpline(true);
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Home */}
        <section
          id="home"
          data-scroll-section
          className="mt-32 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              {pills.map((pill) => (
                <span key={pill} className={styles.pill}>{pill}</span>
              ))}
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                  <span>Eva</span>
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl"> Sabeeh.</span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                {heroDescription}
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="https://drive.google.com/file/d/1bl4uwfV8MdEZQ8FeSAEiLNzOOcW1i6xC/view?usp=drive_link" passHref>
                <Button>
                  Resume <FaChevronRight className="ml-2 h-2 w-2" />
                </Button>
              </Link>
              <Link href="mailto:evasabeeh@gmail.com">
                <Button
                  variant="outline"
                >
                  Get in Touch
                </Button>
              </Link>
            </span>
            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              <LuMouse className="!text-white relative z-10 mt-1 animate-bounce" size={50} />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            {canRenderSpline ? (
              <Spline scene="/assets/scene.splinecode" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-3xl border border-muted/40 bg-gradient-to-br from-background to-muted/10 p-8 text-center text-sm text-muted-foreground">
                3D preview unavailable on this device. Please enable WebGL or try a different browser.
              </div>
            )}
          </div>
        </section>

        {/* Social */}
        <section id="social" className="mt-20">
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon === "LuLinkedin" ? LuLinkedin : social.icon === "FaGithub" ? FaGithub : FaCode;
              return (
                <Link key={social.name} href={social.href}>
                  <Button variant="outline" className="bg-transparent text-white size-20 md:size-24">
                    <Icon size={24} />
                  </Button>
                </Link>
              );
            })}
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mt-14 flex max-w-6xl flex-col justify-start"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

              <div className="order-1 lg:order-2 flex-shrink-0">
                <div 
                  id="profile-tilt"
                  className="relative w-48 h-80"
                >
                  <Image
                    src="/assets/dp-img.jpg"
                    alt="Eva Sabeeh"
                    width={320}
                    height={320}
                    className="w-full h-full object-contain rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-primary/20"
                    quality={95}
                    priority
                  />

                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-sm"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/20 rounded-full blur-lg"></div>
                </div>
              </div>
              
              <div className="order-2 lg:order-1 flex-1">
                <h2 className="py-12 text-xl font-light leading-normal tracking-tighter text-foreground xl:text-[32px]">
                  {intro}
                </h2>
              </div>
            </div>
            
            {/* Stats Section */}
            <div
              className="md:pt-20 grid grid-cols-2 gap-8 xl:grid-cols-2 justify-items-center">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".6"
            data-scroll-position="top"
            data-scroll-enable-touch-speed
            className="flex flex-col justify-start space-y-10"
          >
            <div className="flex flex-col pb-6 xl:p-1">
              <h2 className="text-4xl font-medium tracking-tight">
                Work <span className="text-gradient clash-grotesk tracking-normal">Experience</span>
              </h2>
              <p className="mt-2 tracking-tighter text-secondary-foreground">
                My journey through various roles and projects
              </p>
            </div>

            <div className="relative max-w-7xl mx-auto px-4">

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative mb-20 text-center"
              >
                <div className="md:ml-0 text-center relative z-30 rounded-lg px-3 py-2 sm:px-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient clash-grotesk">
                    Journey continues
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Open to work
                  </div>
                </div>
              </motion.div>

              <div className="relative">

                <div className="md:hidden absolute left-1/2 top-[-5rem] bottom-0 w-px bg-gradient-to-b from-primary to-primary/30 transform -translate-x-1/2 pointer-events-none" />

                <div className="hidden md:flex justify-between items-center mb-2 relative">
                  {experiences.map((experience, index) => {
                    const month = experience.period.split(' ')[0];
                    return (
                      <motion.div
                        key={`year-${index}`}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                      >
                        <div className="px-28 text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient clash-grotesk">
                          {month}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="hidden md:block relative mb-16">
                  <div className="w-full h-1 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      viewport={{ once: true }}
                      className="w-full h-full bg-gradient-to-r from-primary to-primary rounded-full origin-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.title}
                      initial={{ 
                        opacity: 0, 
                        y: 50 
                      }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                      }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <motion.div
                        className="hidden md:block absolute -top-16 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-primary/80 to-primary/10"
                        initial={{ scaleY: 0, opacity: 0 }}
                        whileInView={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 1 }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: 'top' }}
                      />

                      <div className="group relative z-10 overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/30 h-full">
              
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -top-2 -right-2 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
                        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-secondary/10 rounded-full blur-lg group-hover:bg-secondary/20 transition-colors duration-500" />

                        <div className="relative z-10">

                          <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                            viewport={{ once: true }}
                            className="text-xl lg:text-2xl font-semibold mb-3 leading-tight"
                          >
                            <span className="text-gradient clash-grotesk">
                              {experience.title}
                            </span>
                          </motion.h4>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                            viewport={{ once: true }}
                            className="mb-4"
                          >
                            <h3 className="text-lg text-foreground font-medium mb-1">
                              {experience.company}
                            </h3>
                            <p className="text-sm text-primary font-semibold">
                              {experience.period}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                            viewport={{ once: true }}
                            className="space-y-3"
                          >
                            <h5 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                              Tech Stack
                            </h5>
                            <div className="flex flex-wrap gap-2 justify-start">
                              {experience.technologies.map((tech, techIndex) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0, y: 20 }}
                                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: index * 0.2 + 0.9 + techIndex * 0.1,
                                    type: "spring",
                                    stiffness: 200,
                                  }}
                                  viewport={{ once: true }}
                                  whileHover={{ 
                                    scale: 1.1,
                                    y: -2,
                                    transition: { duration: 0.2 }
                                  }}
                                  className="px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 text-foreground/90 rounded-full border border-white/20 text-xs font-medium hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 cursor-default backdrop-blur-sm shadow-sm"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            data-scroll-enable-touch-speed
            className="flex flex-col justify-start space-y-10"
          >
            <div className="flex flex-col py-16 xl:p-1">
              <h2 className="text-4xl font-medium tracking-tight">
                Skill & Platforms <span className="text-gradient clash-grotesk tracking-normal"> Section</span>
              </h2>
              <p className="mt-2 tracking-tighter text-secondary-foreground">
                Here are my skills and expertise I own
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.1,
              }}
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05
                  }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/30 group">

                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary/10 rounded-full blur-lg group-hover:bg-primary/20 transition-colors duration-500" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-secondary/10 rounded-full blur-md group-hover:bg-secondary/20 transition-colors duration-500" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="relative">
                        <Image
                          src={skill.image}
                          alt={skill.skill}
                          width={100}
                          height={100}
                          className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>

          <div 
            data-scroll
            data-scroll-speed=".8"
            data-scroll-position="top" 
            className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-enable-touch-speed
            data-scroll-speed=".06"
            className="mb-16">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ I got you here.
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Project <span className="text-gradient clash-grotesk tracking-normal"> Showcase</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, here are:
            </p>

            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" data-scroll-section className="overflow-hidden">
          <div
            data-scroll
            data-scroll-speed=".4"
            className="flex flex-col justify-start space-y-10"
          >
            <div 
              className="flex flex-col pt-6 xl:p-1">
              <h2 className="text-4xl font-medium tracking-tight">
                Education <span className="text-gradient clash-grotesk tracking-normal">Background</span>
              </h2>
              <p className="mt-2 tracking-tighter text-secondary-foreground">
                My academic foundation and learning path
              </p>
            </div>

            <div className="relative max-w-full mx-auto overflow-hidden">

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative flex justify-center mb-12 sm:mb-16 z-20"
              >
                <div className="md:ml-0 text-center relative z-30 rounded-lg px-3 py-2 sm:px-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gradient clash-grotesk">
                    Graduated
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-primary/20 clash-grotesk">
                    2025
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Academic Excellence
                  </div>
                </div>
              </motion.div>

              <div className="absolute left-6 sm:left-8 md:left-1/2 top-32 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-px z-10 hidden md:block">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="w-full h-full bg-gradient-to-b from-primary to-primary/30 origin-top"
                />
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 top-24 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden z-0">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="w-full h-full bg-gradient-to-b from-primary to-primary/30 origin-top"
                />
              </div>

              <div className="space-y-6 md:space-y-10">
                {education.map((educationItem, index) => (
                  <div key={educationItem.course}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.3 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center ${index % 2 === 0
                          ? 'md:flex-row flex-col'
                          : 'md:flex-row-reverse flex-col'
                        }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.3 + 0.7 }}
                        viewport={{ once: true }}
                        className={`group relative md:ml-0 ${index % 2 === 0
                            ? 'md:mr-4 lg:mr-8 md:text-right'
                            : 'md:ml-4 lg:ml-8 md:text-left'
                          } md:w-5/12 lg:w-1/2 w-full md:pr-0 z-20`}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/30 group z-10">

                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
                          <div className="absolute -bottom-2 -left-2 w-12 h-12 sm:w-16 sm:h-16 bg-secondary/10 rounded-full blur-lg group-hover:bg-secondary/20 transition-colors duration-500" />

                          <div className="relative z-10">

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.3 + 1.2 }}
                              viewport={{ once: true }}
                            >
                              <h3 className="text-md sm:text-lg lg:text-xl font-semibold tracking-tight text-foreground">
                                {educationItem.course}
                              </h3>
                              <h4 className="text-base sm:text-md lg:text-lg text-semibold text-gradient clash-grotesk mb-3 sm:mb-4">
                                {educationItem.college}
                              </h4>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.3 + 1.6 }}
                              viewport={{ once: true }}
                              className="space-y-1"
                            >
                              <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
                                Academic Focus
                              </span>
                              <div className={`flex flex-wrap gap-1 ${index % 2 === 0 ? 'md:justify-end justify-start' : 'md:justify-start justify-start'
                                }`}>
                                {educationItem.academicFocus.map((subject, subjectIndex) => (
                                  <motion.span
                                    key={subject}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      duration: 0.4,
                                      delay: index * 0.3 + 1.8 + subjectIndex * 0.1
                                    }}
                                    viewport={{ once: true }}
                                    className="px-2 py-1 text-xs font-medium bg-white/10 text-foreground/80 rounded-full border border-white/20 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-default"
                                  >
                                    {subject}
                                  </motion.span>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.9 }}
                        viewport={{ once: true }}
                        className={`hidden md:block ${index % 2 === 0 ? 'md:ml-4 lg:ml-8' : 'md:mr-4 lg:mr-8'
                          } md:w-5/12 lg:w-2/5 z-20`}
                      >
                        <div className={`${index % 2 === 0 ? 'text-left' : 'text-right'
                          }`}>
                          <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary/20 clash-grotesk">
                            {educationItem.year}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {educationItem.duration}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {index < education.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 1.5 }}
                        viewport={{ once: true }}
                        className="md:hidden relative flex justify-center my-6 z-20"
                      >
                        <div className="text-center bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
                          <div className="text-5xl font-bold text-primary/30 clash-grotesk">
                            {education[index + 1]?.year}
                          </div>
                          <div className="text-md text-muted-foreground mt-1">
                            Pass out
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 px-8 py-16 xl:py-24 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute -top-2 -right-2 w-32 h-32 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
            <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-secondary/10 rounded-full blur-lg group-hover:bg-secondary/20 transition-colors duration-500" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-md group-hover:bg-primary/15 transition-colors duration-700" />

            <div 
              data-scroll
              data-scroll-speed=".2"
              data-scroll-enable-touch-speed
            className="relative z-10 flex flex-col items-center justify-center text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-medium tracking-tighter xl:text-6xl group-hover:text-primary transition-colors duration-300"
              >
                Let&apos;s{" "}
                <span className="text-gradient clash-grotesk">Connect.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-4 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl"
              >
                Actively seeking opportunities to contribute and grow while delivering impactful solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="mailto:evasabeeh@gmail.com" passHref>
                  <Button className="mt-8 transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    Get in touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      <div className="absolute -top-40 sm:-top-80 right-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
