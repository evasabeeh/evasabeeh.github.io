import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { LuMail } from "react-icons/lu";

function getLocalTime() {
  const date = new Date();
  return date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(getLocalTime());
    
    const interval = setInterval(() => {
      setTime(getLocalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            Thank you for being here.{" "}
            <Link
              href="https://github.com/evasabeeh"
              target="_blank"
              passHref
              className="text-foreground transition hover:text-primary"
            >
              Eva Sabeeh
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold">{time} GMT+5.30</p>
          </span>
        </span>
        <Link
          href="mailto:evasabeeh@gmail.com"
          passHref
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          <Button variant="outline">
            <LuMail className="h-4 w-4 md:mr-2" />
            <span className="hidden md:flex">evasabeeh@gmail.com</span>
          </Button>
        </Link>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}