import ctx from "./ctxSchema";
import useCtx from "./Hooks/ctxHook";

function App() {
  const c = useCtx(ctx);
  return (
    <div id="cnt" className="w-screen h-screen bg-black text-white">
      {c.ctx.word}
      <button
        onClick={() => {
          c.setCtx("word", "goo");
        }}
      >
        CHANGE
      </button>
    </div>
  );
}

export default App;
