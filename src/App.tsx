import ctx from "./ctxSchema";
import useCtx from "./Hooks/ctxHook";

function App() {
  const c = useCtx(ctx);
  return (
    <>
      <div
        id="cnt"
        className="border border-white/25 rounded-[5em] [corner-shape:squircle] overflow-hidden w-[calc(100vw-10vh)] h-[90vh] relative bg-black text-white shadow-[0_0_10px_10px_rgba(255,255,255,0.05)]"
      >
        {c.ctx.locked && (
          <div className="absolute flex flex-col justify-around items-center w-full h-full bg-black/80 backdrop-blur-xl">
            <div className="flex flex-col justify-center items-center">
              <p className="text-9xl text-white font-[Henny_Penny] text-shadow-[0_3px_0px_rgba(0,0,0,0.8)]">
                {"0731"}
              </p>
              <p className="text-4xl text-white font-[Jolly_Lodger] text-shadow-[0_2px_0px_rgba(0,0,0,0.8)]">
                {"13 October, 2025"}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="w-20 aspect-square rounded-full bg-white"></div>
              <p>YOU</p>
              <div className="text-center flex flex-col h-17 gap-2 mt-5">
                <input
                  type="password"
                  value={c.ctx.password}
                  onChange={(e) => {
                    c.setCtx("password", e.target.value);
                  }}
                  placeholder="Enter Password"
                  className="focus:translate-y-1 focus:-mt-2 focus:border-2 focus:h-10 focus:w-50 focus:text-2xl focus:cursor-text cursor-pointer transition-all duration-300 text-center text-lg w-40 h-8 bg-white/10 border border-white/20 rounded-full"
                />
                {c.ctx.password && (
                  <p className="text-sm opacity-60">Press Enter key to login</p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="bg-[url(/bg.webp)] w-full h-full bg-cover bg-no-repeat"></div>
        <div className="w-full h-full absolute top-0 z-200 backdrop-blur-[15px] brightness-250 opacity-20 pointer-events-none contrast-150"></div>
      </div>
    </>
  );
}

export default App;
