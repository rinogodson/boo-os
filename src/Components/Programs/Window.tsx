import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MoveDiagonal, X } from "lucide-react";

function Window({
  spaceRef,
  c,
  index,
  children,
  title,
  posX,
  posY,
  width,
  height,
  maxH,
  maxW,
  minW,
  minH,
  resizable,
}: {
  spaceRef: any;
  c: { setCtx: Function; ctx: { windows: any } };
  index: number;
  children: any;
  title: string;
  posX: number;
  posY: number;
  width: number;
  height: number;
  maxW?: number;
  maxH?: number;
  minW?: number;
  minH?: number;
  resizable: Boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeInfo = useRef({
    dir: "",
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
  });

  const clamp = (val: number, min?: number, max?: number) => {
    if (min !== undefined) val = Math.max(min, val);
    if (max !== undefined) val = Math.min(max, val);
    return val;
  };

  useEffect(() => {
    if (spaceRef.current) {
      setDimensions({
        w: spaceRef.current.offsetWidth,
        h: spaceRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        c.setCtx(`windows[${index}].posX`, e.clientX - dragOffset.current.x);
        c.setCtx(`windows[${index}].posY`, e.clientY - dragOffset.current.y);
      }

      if (isResizing) {
        const { dir, startX, startY, startW, startH } = resizeInfo.current;
        let newW = startW;
        let newH = startH;

        if (dir.includes("e")) newW = startW + (e.clientX - startX);
        if (dir.includes("s")) newH = startH + (e.clientY - startY);
        if (dir.includes("w")) newW = startW - (e.clientX - startX);
        if (dir.includes("n")) newH = startH - (e.clientY - startY);

        newW = clamp(newW, minW, maxW);
        newH = clamp(newH, minH, maxH);

        c.setCtx(`windows[${index}].width`, newW);
        c.setCtx(`windows[${index}].height`, newH);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const startResize = (e: React.MouseEvent, dir: string) => {
    if (!resizable) return;
    setIsResizing(true);
    resizeInfo.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: width,
      startH: height,
    };
  };
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      exit={{
        scale: 1.1,
        opacity: 0,
        translateY: "-300px",

        filter: "blur(300px) brightness(50)",
        transition: {
          duration: 0.5,
          ease: [0, 0, 1, 1],
        },
      }}
      style={{
        width: width,
        height: height,
        translate: `calc(-50% + ${posX}px) calc(-50% + ${posY}px)`,
      }}
      className="origin-bottom overflow-hidden absolute border border-white/10 bg-[#0b0b0b] top-[50%] left-[50%] rounded-2xl shadow-[inset_0_1px_1px_1px_rgba(255,255,255,0.1),0_1px_1px_1px_rgba(0,0,0,0.1)]"
    >
      <div className="h-8 w-full flex justify-start items-center">
        <div className="flex gap-1.5 h-4 absolute top-2 left-2 cursor-pointer">
          <div
            onClick={() => {
              const newArr = [
                ...c.ctx.windows.slice(0, index),
                ...c.ctx.windows.slice(index + 1),
              ];

              c.setCtx("windows", [...newArr]);
            }}
            className="h-full aspect-square bg-red-600 border-2 border-white/20 active:shadow-[0_0_40px_2px_rgba(255,0,0,0.2)] rounded-full active:bg-red-500 flex justify-center items-center"
          >
            <X
              size={13}
              className="text-red-300 hover:opacity-100 opacity-0 w-full h-full"
            />
          </div>
          <div
            onClick={() => {
              c.setCtx(`windows[${index}].width`, dimensions.w - 40);
              c.setCtx(`windows[${index}].height`, dimensions.h - 80);
              c.setCtx(`windows[${index}].posX`, 0);
              c.setCtx(`windows[${index}].posY`, 0);
            }}
            className="h-full aspect-square bg-green-600 border-2 border-white/20 active:shadow-[0_0_40px_2px_rgba(0,255,0,0.2)] rounded-full active:bg-green-500 flex justify-center items-center"
          >
            <MoveDiagonal
              size={13}
              className="text-green-300 hover:opacity-100 opacity-0 w-full h-full"
            />
          </div>
        </div>
        <div
          onMouseDown={(e: React.MouseEvent) => {
            setIsDragging(true);
            dragOffset.current = {
              x: e.clientX - posX,
              y: e.clientY - posY,
            };
          }}
          onMouseUp={() => {
            setIsDragging(false);
          }}
          onClick={() => {
            c.setCtx("cApp", title);
            const newArr = structuredClone(c.ctx.windows);
            [newArr[index], newArr[newArr.length - 1]] = [
              newArr[newArr.length - 1],
              newArr[index],
            ];

            c.setCtx("windows", [...newArr]);
          }}
          className="w-full h-full flex justify-center items-center font-bold text-sm cursor-grab active:cursor-grabbing"
        >
          {title}
        </div>
      </div>
      <div className="relative h-[calc(100%-2rem)] w-full">{children}</div>
      <div
        onClick={() => {
          const newArr = structuredClone(c.ctx.windows);
          [newArr[index], newArr[newArr.length - 1]] = [
            newArr[newArr.length - 1],
            newArr[index],
          ];

          c.setCtx("windows", [...newArr]);
        }}
        id="resizers"
      >
        <div className="w-full h-3  absolute bottom-0 grid grid-cols-[3em_1fr_3em]">
          <div
            onMouseDown={(e) => startResize(e, "sw")}
            className="w-full h-full cursor-sw-resize"
          />

          <div
            onMouseDown={(e) => startResize(e, "s")}
            className="w-full h-full cursor-s-resize"
          />
          <div
            onMouseDown={(e) => startResize(e, "se")}
            className="w-full h-full cursor-se-resize"
          />
        </div>
        <div
          onMouseDown={(e) => startResize(e, "e")}
          className="w-3 h-[calc(100%-1.5rem)] top-3 absolute right-0 grid grid-row-[3em_1fr_3em] cursor-e-resize"
        ></div>
        <div
          onMouseDown={(e) => startResize(e, "w")}
          className="w-3 h-[calc(100%-1.5rem)] top-3 absolute left-0 grid grid-row-[3em_1fr_3em] cursor-w-resize"
        ></div>
      </div>
    </motion.div>
  );
}

export default Window;
