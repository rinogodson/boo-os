import Calculator from "./Components/Programs/Calculator/Calculator";
import Finder from "./Components/Programs/Finder/Finder";
import Settings from "./Components/Programs/Settings/Settings";
import TextEditor from "./Components/Programs/TextEditor/TextEditor";
import type ctx from "./ctxSchema";

const programWindows: Record<
  string,
  React.ComponentType<{ c: { ctx: typeof ctx; setCtx: Function } }>
> = {
  Calculator: Calculator,
  TextEditor: TextEditor,
  Finder: Finder,
  Settings: Settings,
};

export default programWindows;
