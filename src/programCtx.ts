import Calculator from "./Components/Programs/Calculator/Calculator";
import Finder from "./Components/Programs/Finder/Finder";
import Settings from "./Components/Programs/Settings/Settings";
import TextEditor from "./Components/Programs/TextEditor/TextEditor";

const programWindows: Record<string, React.FC> = {
  Calculator: Calculator,
  TextEditor: TextEditor,
  Finder: Finder,
  Settings: Settings,
};

export default programWindows;
