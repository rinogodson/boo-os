import fileTree from "./FileStructure";

function Finder() {
  return (
    <div className="h-full w-full flex">
      <div
        className="h-full w-60 bg-white/4 border-r border-white/20 p-2"
        id="sidebar"
      >
        {fileTree.Home.map((item) => {
          return (
            <p className="w-full h-fit px-3 py-1 hover:bg-white/5 rounded-xl text-xl">
              {item.name}
            </p>
          );
        })}
      </div>
      <div className="w-full h-full bg-white/2"></div>
    </div>
  );
}

export default Finder;
