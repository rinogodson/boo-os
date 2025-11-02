import { useState } from "react";

function Finder() {
  const [fileTree] = useState({
    Home: {
      Documents: {
        "Resume.pdf": null,
        "Notes.txt": null,
      },
      Downloads: {
        "Setup.dmg": null,
        "Wallpaper.jpg": null,
      },
      Pictures: {
        "Vacation.png": null,
        "Family.jpg": null,
      },
      Music: {
        "Favorite.mp3": null,
      },
      Videos: {
        "Trailer.mov": null,
      },
    },
  });

  const [currentPath, setCurrentPath] = useState(["Home"]);
  const currentDir = currentPath.reduce(
    (acc: any, key: any) => acc[key],
    fileTree,
  );
  const items = Object.keys(currentDir);

  function handleClick(item: any) {
    if (currentDir[item] && typeof currentDir[item] === "object") {
      setCurrentPath([...currentPath, item]);
    }
  }

  function goBack() {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  }

  return (
    <div className="h-full w-full flex text-white font-sans select-none">
      <div className="h-full w-60 bg-white/5 border-r border-white/10 p-2 flex flex-col">
        <div
          className="px-3 py-2 mb-2 text-lg font-semibold hover:bg-white/10 rounded-xl cursor-pointer"
          onClick={goBack}
        >
          ← {currentPath.join(" / ")}
        </div>
        {items.map((item) => (
          <p
            key={item}
            onClick={() => handleClick(item)}
            className="w-full px-3 py-1 hover:bg-white/10 rounded-xl text-base cursor-pointer truncate"
          >
            {item}
          </p>
        ))}
      </div>
      <div className="w-full h-full bg-white/5 p-4 overflow-auto">
        <p className="text-xl font-semibold mb-3">
          {currentPath[currentPath.length - 1]}
        </p>
        <div className="grid grid-cols-4 gap-3">
          {items.map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              className="flex flex-col items-center justify-center rounded-2xl p-3 cursor-pointer hover:bg-white/10 transition"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl mb-2" />
              <p className="text-sm text-center truncate w-full">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Finder;
