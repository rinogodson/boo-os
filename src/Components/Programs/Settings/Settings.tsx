function Settings({ c }: { c?: any }) {
  return (
    <div className="h-full w-full p-5 gap-5 flex flex-col">
      <h1 className="text-3xl">Wallpaper</h1>
      <div
        style={{ background: `url(${c.ctx.wallpaper})` }}
        className="bg-cover w-70 h-45 border-4 border-white/20 rounded-4xl"
      ></div>
      <div className="flex gap-3">
        {c.ctx.wallpapers.map((item: string) => {
          return (
            <div
              onClick={() => c.setCtx("wallpaper", item)}
              style={{
                background: `url(${item})`,
                borderColor:
                  item === c.ctx.wallpaper
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.2)",
              }}
              className="w-70 aspect-video border-2 border-white/20 rounded-xl"
            ></div>
          );
        })}
      </div>
      <div className="w-full h-0.5 bg-white/20"></div>
      <h1 className="text-3xl">Dock Size</h1>
      <input
        type="range"
        min={20}
        max={100}
        value={c.ctx.dockSize * 100}
        onChange={(e) => c.setCtx("dockSize", Number(e.target.value) / 100)}
        className="appearance-none w-full h-1.5 rounded-full bg-white/20 
         accent-white cursor-pointer transition-all duration-300
         hover:bg-white/30 focus:outline-none
         [&::-webkit-slider-thumb]:appearance-none
         [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
         [&::-webkit-slider-thumb]:rounded-full
         [&::-webkit-slider-thumb]:bg-white
         [&::-webkit-slider-thumb]:shadow-[0_0_4px_rgba(255,255,255,0.5)]
         [&::-webkit-slider-thumb]:transition-all
         [&::-webkit-slider-thumb]:duration-300
         [&::-webkit-slider-thumb]:hover:scale-110
         [&::-webkit-slider-thumb]:active:scale-95
         [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
         [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
         [&::-moz-range-thumb]:border-0"
      />
    </div>
  );
}

export default Settings;
