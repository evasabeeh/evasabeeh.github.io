import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  GraduationCap,
  Linkedin,
  Github,
  Code2,
  Mouse,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Programming Languages known", value: "4+" },
  { label: "Technologies mastered", value: "5+" },
];


const projects = [
  {
    title: "Social Media Website",
    description: "Focused on frontend for a social media site",
    image: "/assets/socialmedia.png",
    href: "https://evasabeeh-socialmediawebsite.vercel.app/",
  },
  {
    title: "Amazon Frontend Clone",
    description: "Replicates Amazon's user-friendly interface",
    image: "/assets/amazon.png",
    href: "https://evasabeeh-amazonclone.vercel.app/",
  },
  {
    title: "Optimized Travel Route Planner",
    description: "Utilizes data structure to calculate the optimal route",
    image: "/assets/travelroute.png",
    href: "https://github.com/evasabeeh/TravelRoutePlanner",
  },
  {
    title: "Melofy - Spotify inspired app",
    description: "An Android music playback application inspired by Spotify",
    image: "/assets/melofy.png",
    href: "https://github.com/evasabeeh/Melofy/releases/tag/android-app",
  },
  {
    title: "Bookmania - Digitized Bookstore",
    description: "Responsive and mobile-first layout",
    image: "/assets/bookmania.png",
    href: "https://evasabeeh-bookmania.vercel.app/",
  },
  {
    title: "Food Ordering system",
    description: "Full-stack real-time MERN app",
    image: "/assets/food.png",
    href: "https://fooddelivery-frontend-szy1.onrender.com/",
  },
];

const skills = [
  {
    skill: "C++",
    image: "/skills/cpp.png",
  },
  {
    skill: "Core Java",
    image: "/skills/java.png",
  },
  {
    skill: "HTML",
    image: "/skills/html.png",
  },
  {
    skill: "CSS",
    image: "/skills/css.png",
  },
  {
    skill: "JavaScript",
    image: "/skills/js.png",
  },
  {
    skill: "React JS",
    image: "/skills/react.png",
  },
  {
    skill: "Tailwind CSS",
    image: "/skills/tailwind.png",
  },
  {
    skill: "Bootstrap",
    image: "/skills/bootstrap.png",
  },
  {
    skill: "Sass",
    image: "/skills/sass.png",
  },
  {
    skill: "Jetpack Compose",
    image: "/skills/jetpack.png",
  },
  {
    skill: "Git",
    image: "/skills/git.png",
  },
  {
    skill: "GitHub",
    image: "/skills/github.png",
  },
  {
    skill: "MySQL",
    image: "/skills/mysql.png",
  },
  {
    skill: "VS Code",
    image: "/skills/vs.png",
  },
  {
    skill: "Figma",
    image: "/skills/figma.png",
  },
  {
    skill: "Android Studio",
    image: "/skills/android.png",
  },
  {
    skill: "MongoDB",
    image: "/skills/mongo.png",
  },
  {
    skill: "Postman",
    image: "/skills/postman.png",
  },
];

const services = [
  {
    service: "CISCE, Matriculation",
    year: "2019",
    description:
      "Spring Dale College, Lucknow",
    icon: GraduationCap,
  },
  {
    service: "CISCE, Intermediate, Mathematics",
    year: "2021",
    description:
      "Spring Dale College, Lucknow",
    icon: GraduationCap,
  },
  {
    service: "Bachelor of Engineering, Computer Science",
    year: "2025",
    description:
      "Chandigarh University, Mohali",
    icon: GraduationCap,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
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
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
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

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 md-20 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>Web Development</span>
              <span className={styles.pill}>Problem Solving</span>
              <span className={styles.pill}>Android UI Development</span>
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
                A passionate tech enthusiast and keen learner, driven by curiosity and innovation, aim to create impactful solutions in the tech world.
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
                  Resume <ChevronRight className="ml-1 h-4 w-4" />
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
              <Mouse className="!text-white relative z-10 mt-1 animate-bounce" size={50} /> 
            </div>

          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex justify-center gap-6">
            <Link href="https://linkedin.com/in/eva-sabeeh/">
              <Button variant="outline" className="bg-transparent text-white size-20">
                <Linkedin />
              </Button>
            </Link>
            <Link href="https://github.com/evasabeeh/">
              <Button variant="outline" className="bg-transparent text-white size-20">
                <Github />
              </Button>
            </Link>
            <Link href="https://linktr.ee/evasabeeh">
              <Button variant="outline" className="bg-transparent text-white size-20">
                <Code2 />
              </Button>
            </Link>
            </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              Hi! I&apos;m Eva, from Lucknow, the City of Nawabs.<br></br>
              A final year Bachelor&apos;s student of Computer Science and Engineering at Chandigarh University. With a strong foundation in programming languages like C++ and Core Java, I excel in Problem-Solving and Object-Oriented Programming.<br></br>
              Beyond coding, I have honed my skills in Web Development, driven by my passion for creating intuitive and visually appealing user experiences. Additionally, I have experience in Android UI Development, and dived into the MERN to build full-stack web applications.
            </h2>
            <div className="pt-20 grid grid-cols-2 gap-8 xl:grid-cols-2 justify-items-center">
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


        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col justify-start space-y-10"
          >

            <div className="flex flex-col py-6 xl:p-1">
              <h2 className="text-4xl font-medium tracking-tight">
                Skill <span className="text-gradient clash-grotesk tracking-normal"> Section</span>
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
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-1"
            >
          
              {skills.map((skill) => (
                <div
                  key={skill.skill}
                  className="flex flex-col items-start rounded-md bg-white/5 p-10 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <Image
                    src={skill.image}
                    alt="skill"
                    width={100}
                    height={100}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
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
          <div data-scroll data-scroll-speed=".4" className="my-16">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ I got you here.
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Project <span className="text-gradient clash-grotesk tracking-normal"> Showcase</span> 
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, here are:
            </p>

            {/* Carousel */}
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
        
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-16 flex flex-col justify-start space-y-10"
          >
            <div className="flex flex-col py-6 xl:p-1">
              <h2 className="text-4xl font-medium tracking-tight">
                Education <span className="text-gradient clash-grotesk tracking-normal">Background</span>
              </h2>
              <p className="mt-2 tracking-tighter text-secondary-foreground">
                Here is my education background.
              </p>
            </div>

            <div className="relative flex flex-col items-center gap-2">
              {/* Vertical Line for Timeline */}
              <div className="absolute inset-y-0 left-1/2 w-px bg-primary/50"></div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  staggerChildren: 0.5,
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-10 relative z-10"
              >
                {services.map((service) => (
                  <div
                    key={service.service}
                    className="flex flex-col items-start rounded-md bg-white/5 p-6 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md w-full max-w-md"
                  >
                    <span className="text-lg tracking-tight text-foreground">{service.service}</span>
                    <span className="text-lg tracking-tight text-primary">{service.year}</span>
                    <span className="mt-2 tracking-tighter text-muted-foreground">{service.description}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>



        {/* Contact */}
        <section id="contact" data-scroll-section className="my-16">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s{" "}
              <span className="text-gradient clash-grotesk">Connect.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Actively seeking opportunities to contribute and grow while delivering impactful solutions.
            </p>
            <Link href="mailto:evasabeeh@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
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

      {/* Lower gradient */}
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
