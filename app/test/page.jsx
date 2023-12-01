"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const playerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#section",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: true,
          onUpdate: (x) => {
            playerRef.current.setSeeker(Math.round(x.progress * 80), true);
          },
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top +=100%",
          end: "bottom bottom",
          markers: true,
          scrub: true,
        },
      });

      tl.to("#lottie", {
        opacity: 0,
      })
        .set("secondLogo", {
          opacity: 0,
        })
        .from("#secondLogo", {
          y: "-100vh",
          minWidth: "100vw",
          opacity: 0,
          duration: 2,
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">
      <div className="rounded-[3.6vmax] border-[4px] border-black fixed inset-0 pointer-events-none z-50 p-[clamp(20px,5vw,100px)]">
        <div className="flex">
          <Image
            src={"/bynd.png"}
            height={70}
            width={102}
            alt="logo"
            className="hidden-nav-items"
          />
          <div className="flex justify-end gap-20 items-center grow text-black font-bold">
            <Link href={"#"} className="hidden-nav-items">
              Projects
            </Link>
            <Link href={"#"} className="hidden-nav-items">
              About
            </Link>
            <button>Dark</button>
            <div className="flex gap-4">
              <Link href={"#"} className="hidden-nav-items">
                TW
              </Link>
              <Link href={"#"} className="hidden-nav-items">
                IN
              </Link>
            </div>
          </div>
        </div>
        <button className="text-black animate-bounce absolute bottom-0 left-0 p-[clamp(20px,5vw,100px)]">
          Scroll Down
        </button>
      </div>
      <div
        id="section"
        className="h-screen bg-white relative  flex flex-col justify-center"
      >
        <Player
          ref={playerRef}
          src="/lottie.json"
          style={{ width: "100%", pointerEvents: "none", maxWidth: 1920 }}
          id="lottie"
        />
      </div>
      <div
        id="about"
        className="flex h-screen items-center text-black  bg-white"
      >
        <div
          id="secondLogo"
          className="w-2/6 pe-20 relative ps-[clamp(20px,5vw,100px)] flex items-center justify-center"
        >
          <Image
            src={"/bynd.png"}
            height={633}
            width={434}
            alt="logo"
            className="w-full object-contain max-w-[633px]"
          />
        </div>
        <div className="w-4/6 overflow-hidden">
          <div id="about-text" className="w-full pe-[clamp(20px,5vw,100px)]">
            <h1 className="text-6xl mb-6 font-extrabold">ABOUT</h1>
            <p className="mb-2">
              We are BYND. Loren ipsum, morealis, loren ipsum loreanis. We are
              BYND. Loren ipsum, morealis, loren ipsum loreanis.
            </p>
            <p className="mb-2">
              We are BYND. Loren ipsum, morealis, loren ipsum loreanis. We are
              BYND. Loren ipsum, morealis, loren ipsum loreanis We are BYND.
              Loren ipsum, morealis, loren ipsum loreanis. We are BYND. Loren
              ipsum, morealis, loren ipsum loreanis We are BYND. Loren ipsum,
              morealis, loren ipsum loreanis.
            </p>
            <p className="mb-2">
              We are BYND. Loren ipsum, morealis, loren ipsum loreanis We are
              BYND. Loren ipsum, morealis, loren ipsum loreanis. We are BYND.
              Loren ipsum, morealis, loren ipsum loreanis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
