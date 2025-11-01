import { X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Video() {
  const [hovering, setHovering] = useState(false);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="h-72 w-lg overflow-hidden rounded-xl absolute top-[50%] left-[50%] -translae-x-[50%] -translate-y-[50%] shadow-[inset_0_2px_2px_2px_rgba(255,255,255,0.5),0_2px_2px_2px_rgba(0,0,0,0.1)]"
    >
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            className="h-6 origin-top flex justify-end pr-[0.23rem] items-center w-full absolute top-0 bg-linear-to-b from-white/30"
          >
            <div className="p-0.5 bg-white/30 rounded-full hover:bg-white/20 active:bg-white/50">
              <X size={15} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <iframe
        src={`https://www.youtube.com/embed/VpC1M1MddDQ?rel=0&amp;controls=0&amp;enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full rounded-xl"
      ></iframe>
    </motion.div>
  );
}

export default Video;
