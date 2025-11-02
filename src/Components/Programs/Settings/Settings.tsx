function Settings({ c }: { c?: any }) {
  return (
    <div className="h-full w-full p-5 gap-5 flex flex-col">
      <h1 className="text-5xl">Wallpaper</h1>
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
    </div>
  );
}

export default Settings;
