//    This code is haunted, proceed with care.   

import { AnimatePresence, easeOut, motion, spring } from "motion/react";
import ctx from "./ctxSchema";
import useCtx from "./Hooks/ctxHook";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Window from "./Components/Programs/Window";
import AppIcon from "./Components/Programs/AppIcon";
import programWindows from "./programCtx";

import clickup from "/sounds/clickup.mp3";
import clickdown from "/sounds/clickdown.mp3";
import key1 from "/sounds/key1.mp3";
import key2 from "/sounds/key2.mp3";

import theme from "/sounds/theme.mp3";

import jump from "/sounds/jump.mp3";

// import Video from "./Components/Programs/Finder/MediaPlayers/Video";
//

let pack: { setCtx: Function; ctx: typeof ctx };

function App() {
  const c = useCtx(ctx);
  const [playingTheme, setPlayingTheme] = useState(false);

  const [key, setKey] = useState(1);

  const play = (
    sound: typeof clickup,
    volume: number,
    loop: boolean = false,
  ) => {
    const audio = new Audio(sound);
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
    return audio;
  };

  pack = c;

  const spaceRef = useRef(null);
  const themeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (c.ctx.locked) return;
    const delay = Math.floor(Math.random() * 4000) + 8000;

    const timer = setTimeout(() => {
      if (themeAudioRef.current) {
        themeAudioRef.current.pause();
        themeAudioRef.current.currentTime = 0;
      }
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 1000);

      const audio = new Audio(jump);
      audio.volume = 1.0;
      audio.play().catch((err) => console.error("failure :( ", err));
      setGhost(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [c.ctx.locked]);

  useEffect(() => {
    if (c.ctx.locked === true) return;
    if (playingTheme) return;
    const audio = play(theme, 0.05, true);
    themeAudioRef.current = audio;
    setPlayingTheme(true);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      themeAudioRef.current = null;
      setPlayingTheme(false);
    };
  }, [c.ctx.locked]);

  const [ghost, setGhost] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      c.setCtx("time", `${hours}${minutes}`);

      const day = now.getDate();
      const month = now.toLocaleString("default", { month: "long" });
      const year = now.getFullYear();
      c.setCtx("date", `${day} ${month}, ${year}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {ghost && (
        <motion.div
          initial={{
            opacity: 0.5,
            filter: "blur(100px)",
            scale: 0.9,
            background: "rgba(0,0,0,0)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            background: "rgba(0,0,0,0.8)",
          }}
          transition={{ duration: 0.2, type: "tween", ease: easeOut }}
          className="w-screen flex flex-col justify-center items-center h-screen absolute z-100000"
        >
          <img
            src="/ghost.webp"
            draggable={false}
            className="h-[calc(100%-10rem)]"
          />
          <h1 className="text-5xl text-red-600/20 h-20 font-[Jolly_Lodger] animate-pulse">
            GO AWAY FROM MY OS!! CLOSE THIS NOWWW!!
          </h1>
        </motion.div>
      )}
      <motion.div
        onKeyDown={() => {
          switch (key) {
            case 1:
              play(key1, 0.1);
              break;
            case 2:
              play(key2, 0.1);
              break;
          }
          setKey(key < 2 ? key + 1 : 1);
        }}
        onMouseDown={() => {
          play(clickdown, 0.1);
        }}
        onMouseUp={() => {
          play(clickup, 0.1);
        }}
        ref={spaceRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="cnt"
        className="border border-white/25 rounded-[2em] [corner-shape:squircle] overflow-hidden w-[calc(100vw-10vh)] h-[90vh] relative bg-black text-white shadow-[0_0_10px_10px_rgba(255,255,255,0.05)]"
      >
        <AnimatePresence>
          {c.ctx.locked && (
            <motion.div
              animate={{
                opacity: 1,
                translateY: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.8) 100%, rgba(0,0,0,0))",
              }}
              exit={{
                opacity: 0,
                translateY: "-100px",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0))",
              }}
              transition={{
                type: "tween",
                ease: [0, 0, 0.2, 1],
                duration: 0.5,
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && c.ctx.password)
                  c.setCtx("locked", false);
              }}
              className="absolute flex flex-col justify-around items-center w-full h-full"
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-9xl text-white font-[Henny_Penny] text-shadow-[0_3px_0px_rgba(0,0,0,0.8)]">
                  {c.ctx.time}
                </p>
                <p className="text-4xl text-white font-[Jolly_Lodger] text-shadow-[0_2px_0px_rgba(0,0,0,0.8)]">
                  {c.ctx.date}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="w-20 overflow-hidden aspect-square rounded-full bg-black">
                  <Webcam
                    className="pointer-events-none h-full w-full"
                    videoConstraints={{
                      width: 300,
                      height: 300,
                      facingMode: "user",
                    }}
                  />
                </div>
                <div className="text-center">
                  <p>YOU</p>
                  <p className="text-sm opacity-10">yeah, i can see u</p>
                </div>
                <div className="text-center flex flex-col h-17 gap-2 mt-5">
                  <input
                    type="password"
                    value={c.ctx.password}
                    onChange={(e) => {
                      c.setCtx("password", e.target.value);
                    }}
                    placeholder="Enter Password"
                    style={{ transition: "all " + spring(0.2) }}
                    className="focus:translate-y-1 focus:-mt-2 focus:border-2 focus:h-10 focus:w-50 focus:text-2xl focus:cursor-text cursor-pointer duration-300 text-center text-lg w-40 h-8 bg-white/10 border border-white/20 rounded-full"
                  />
                  {c.ctx.password && (
                    <p className="text-sm opacity-60">
                      Press Enter key to login
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          style={{ background: `url(${c.ctx.wallpaper})` }}
          className=" w-full h-full bg-cover bg-no-repeat"
        >
          <AnimatePresence>
            {!c.ctx.locked &&
              c.ctx.windows.map((item, i) => {
                const Comp = programWindows[item.comp];
                return (
                  <Window
                    spaceRef={spaceRef}
                    c={c}
                    key={item.uid}
                    index={i}
                    title={item.title}
                    posX={item.posX}
                    posY={item.posY}
                    width={item.width}
                    height={item.height}
                    maxH={item.maxH}
                    maxW={item.maxW}
                    minH={item.minH}
                    minW={item.minW}
                    resizable={item.resizable}
                  >
                    <Comp c={c} />
                  </Window>
                );
              })}
          </AnimatePresence>
          {/* {!c.ctx.locked && <Video />} */}
          {!c.ctx.locked && (
            <>
              <motion.div
                initial={{ translateY: "-2.5rem" }}
                animate={{ translateY: "0" }}
                transition={{
                  type: "tween",
                  ease: [0, 0, 0.2, 1],
                  duration: 0.5,
                }}
                className="font-[New_Rocker] px-5 text-2xl flex justify-between items-center border-b-2 border-white/10 backdrop-blur-xl h-10 w-full bg-black/10 absolute top-0 left-[50%] -translate-x-[50%]"
              >
                <div>{c.ctx.cApp}</div>
                <div>
                  {c.ctx.time} . {c.ctx.date}
                </div>
              </motion.div>
              <motion.div
                initial={{ translateY: "5.25rem" }}
                animate={{ translateY: "0" }}
                style={{ scale: c.ctx.dockSize }}
                transition={{
                  type: "tween",
                  ease: [0, 0, 0.2, 1],
                  duration: 0.5,
                }}
                className="p-3 flex gap-3 hover:scale-100 transition-all duration-100 origin-bottom rounded-[3em] [corner-shape:squircle] border-white/10 backdrop-blur-xl backdrop-brightness-150  h-30 w-fit bg-black/10 absolute bottom-3 left-[50%] -translate-x-[50%] shadow-[inset_0_1px_1px_1px_rgba(255,255,255,0.1),0_1px_1px_1px_rgba(0,0,0,0.1)]"
              >
                {c.ctx.apps.map((item, i) => {
                  return (
                    <AppIcon imgSrc={item.icon} title={item.name} c={c} i={i} />
                  );
                })}
              </motion.div>
            </>
          )}
        </div>
        <div className="w-full h-full absolute top-0 z-200 backdrop-blur-[15px] brightness-250 opacity-20 pointer-events-none contrast-150"></div>
      </motion.div>
    </>
  );
}

export { pack };

export default App;
