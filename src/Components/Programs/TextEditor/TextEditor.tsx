import { ArrowDown10, Eraser, Save } from "lucide-react";
import { useEffect, useState } from "react";

function TextEditor() {
  const [text, setText] = useState("");
  const [textCtx, setTextCtx] = useState({
    lineNumber: true,
  });

  useEffect(() => {
    console.log(text);
  }, [text]);

  const handleSave = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text.txt";
    link.click();
  };

  const handleClear = () => {
    setText("");
  };

  const handleToggleLines = () => {
    setTextCtx((prev) => ({ ...prev, lineNumber: !prev.lineNumber }));
  };

  const getLineNumbers = () => {
    const lines = text.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="w-full h-full grid grid-rows-[1fr_4em]">
      <div className="w-full h-full flex overflow-hidden">
        {textCtx.lineNumber && (
          <textarea
            readOnly
            value={getLineNumbers()}
            className="font-[VT323] resize-none text-4xl p-5 bg-white/10 text-end w-20 overflow-hidden select-none"
          />
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="font-[VT323] resize-none text-4xl p-5 w-full h-full bg-white/8 outline-none"
        />
      </div>
      <div className="h-full bg-white/20 border-t border-white/30 flex gap-3 justify-center items-center">
        <Button onClick={handleSave}>
          <Save />
          <p>Save</p>
        </Button>
        <Button onClick={handleClear}>
          <Eraser />
          <p>Clear</p>
        </Button>
        <Button onClick={handleToggleLines}>
          <ArrowDown10 />
          <p>Toggle Line Numbers</p>
        </Button>
      </div>
    </div>
  );
}

const Button = ({
  children,
  onClick,
}: {
  children: any;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white/70 hover:bg-white text-black text-xl gap-2 h-fit px-3 py-2 flex justify-center items-center rounded-2xl [corner-shape:squircle] transition"
    >
      {children}
    </button>
  );
};

export default TextEditor;
