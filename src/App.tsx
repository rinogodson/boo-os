import { AnimatePresence, motion, spring } from "motion/react";
import ctx from "./ctxSchema";
import useCtx from "./Hooks/ctxHook";
import { useEffect } from "react";
import Webcam from "react-webcam";

function App() {
  const c = useCtx(ctx);

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
      <motion.div
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
                    className="h-full w-full"
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
        <div className="bg-[url(/bg.webp)] w-full h-full bg-cover bg-no-repeat">
          {!c.ctx.locked && (
            <>
              <motion.div
                initial={{ translateY: "7.5rem" }}
                animate={{ translateY: "0" }}
                transition={{
                  type: "tween",
                  ease: [0, 0, 0.2, 1],
                  duration: 0.5,
                }}
                className="rounded-[3em] [corner-shape:squircle] border-2 border-white/10 backdrop-blur-xl backdrop-brightness-150  h-30 w-200 bg-black/10 absolute bottom-3 left-[50%] -translate-x-[50%]"
              ></motion.div>
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
                <div>Calculator</div>
                <div>
                  {c.ctx.time} . {c.ctx.date}
                </div>
              </motion.div>
            </>
          )}
        </div>
        <div className="w-full h-full absolute top-0 z-200 backdrop-blur-[15px] brightness-250 opacity-20 pointer-events-none contrast-150"></div>
      </motion.div>
    </>
  );
}

export default App;
