import { Delete, Divide, Equal, Minus, Plus, X } from "lucide-react";
import { spring } from "motion";
import { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("");
  return (
    <div className="text-white w-full h-full p-3 bg-[#0e0e0e] flex flex-col gap-5">
      <div className="text-end h-20 w-full rounded-xl flex justify-end pr-2 text-5xl items-end">
        <input
          type="text"
          value={display}
          className="w-full h-full text-end"
          readOnly
        />
      </div>
      <div className="grid grid-cols-4 grid-rows-5 gap-2 h-full">
        {[
          {
            component: <Delete />,
            colored: null,
            onClick: () => setDisplay(display.slice(0, -1)),
          },
          {
            component: <p>AC</p>,
            colored: null,
            onClick: () => setDisplay(""),
          },
          {
            component: <p>%</p>,
            colored: null,
            onClick: () => {
              try {
                const value = eval(display) / 100;
                setDisplay(String(value));
              } catch {
                setDisplay("Error");
              }
            },
          },
          {
            component: <Divide />,
            colored: true,
            onClick: () => setDisplay(display + "/"),
          },
          {
            component: <p>7</p>,
            colored: false,
            onClick: () => setDisplay(display + "7"),
          },
          {
            component: <p>8</p>,
            colored: false,
            onClick: () => setDisplay(display + "8"),
          },
          {
            component: <p>9</p>,
            colored: false,
            onClick: () => setDisplay(display + "9"),
          },
          {
            component: <X />,
            colored: true,
            onClick: () => setDisplay(display + "*"),
          },
          {
            component: <p>4</p>,
            colored: false,
            onClick: () => setDisplay(display + "4"),
          },
          {
            component: <p>5</p>,
            colored: false,
            onClick: () => setDisplay(display + "5"),
          },
          {
            component: <p>6</p>,
            colored: false,
            onClick: () => setDisplay(display + "6"),
          },
          {
            component: <Minus />,
            colored: true,
            onClick: () => setDisplay(display + "-"),
          },
          {
            component: <p>1</p>,
            colored: false,
            onClick: () => setDisplay(display + "1"),
          },
          {
            component: <p>2</p>,
            colored: false,
            onClick: () => setDisplay(display + "2"),
          },
          {
            component: <p>3</p>,
            colored: false,
            onClick: () => setDisplay(display + "3"),
          },
          {
            component: <Plus />,
            colored: true,
            onClick: () => setDisplay(display + "+"),
          },
          {
            component: <p>00</p>,
            colored: false,
            onClick: () => setDisplay(display + "00"),
          },
          {
            component: <p>0</p>,
            colored: false,
            onClick: () => setDisplay(display + "0"),
          },
          {
            component: <p>.</p>,
            colored: false,
            onClick: () => {
              if (!display.endsWith(".")) setDisplay(display + ".");
            },
          },
          {
            component: <Equal />,
            colored: true,
            onClick: () => {
              try {
                const result = eval(display);
                setDisplay(String(result));
              } catch {
                setDisplay("Error");
              }
            },
          },
        ].map((item) => {
          return (
            <Button
              onClick={item.onClick}
              colored
              key={String(item.component)}
              child={item}
              val={1}
            />
          );
        })}
      </div>
    </div>
  );
}

const Button = ({
  onClick,
  child,
}: {
  onClick: any;
  child: any;
  val?: number;
  colored: boolean;
}) => {
  return (
    <div
      style={{
        background:
          child.colored == null
            ? "rgba(255,255,255,0.2)"
            : !child.colored
              ? "rgba(255,255,255,0.1)"
              : "rgba(255, 140, 0, 1)",
        transition: "all " + spring(0.2, 0.4),
      }}
      onClick={onClick}
      className="hover:scale-105 active:scale-95 active:brightness-150 text-2xl text-white w-full h-full rounded-full flex justify-center items-center shadow-[inset_0_1px_1px_0.5px_rgba(255,255,255,0.2),0_2px_2px_2px_rgba(0,0,0,0.2)]"
    >
      {child.component}
    </div>
  );
};

export default Calculator;
