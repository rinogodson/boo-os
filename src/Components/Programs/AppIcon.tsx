import { useState } from "react";
import { AnimatePresence, motion, spring } from "motion/react";
import type ctx from "../../ctxSchema";

function AppIcon({
  imgSrc,
  title,
  c,
  i,
}: {
  imgSrc: string;
  title: string;
  c: { ctx: typeof ctx; setCtx: Function };
  i: number;
}) {
  const [hovering, sethovering] = useState(false);
  return (
    <div
      onClick={() => {
        if (c.ctx.windows.some((o) => o.title === c.ctx.apps[i].name)) return;
        const newWindow: (typeof ctx.windows)[0] = {
          title: c.ctx.apps[i].name,
          comp: c.ctx.apps[i].comp,
          posX: 0,
          posY: 0,
          width: c.ctx.apps[i].size.W,
          height: c.ctx.apps[i].size.H,
          maxW: c.ctx.apps[i].size.maxW,
          maxH: c.ctx.apps[i].size.maxH,
          minW: c.ctx.apps[i].size.minW,
          minH: c.ctx.apps[i].size.minH,
          resizable: c.ctx.apps[i].size.resizable,
          uid: String(Date.now()) + Math.random().toString(36).slice(2),
        };

        c.setCtx("windows", [...c.ctx.windows, newWindow]);
      }}
      onMouseOver={() => sethovering(true)}
      onMouseLeave={() => sethovering(false)}
      style={{
        background: `url(${imgSrc})`,
        backgroundSize: "contain",
        transition: "all " + spring(0.2),
      }}
      className="[corner-shape:squircle] active:scale-110 active:brightness-90 relative hover:scale-130 hover:mx-5 h-full aspect-square rounded-4xl shadow-[inset_0_1px_1px_1px_rgba(255,255,255,0.3),0_2px_2px_2px_rgba(0,0,0,0.2)]"
    >
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ translateY: "30px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/30 font-[New_Rocker] w-fit h-fit text-xl pointer-events-none backdrop-blur-[100px] absolute -translate-y-12 top-0 left-[50%] -translate-x-[50%] px-3 rounded-2xl border-2 border-white/40 "
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AppIcon;
