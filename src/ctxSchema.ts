const ctx: {
  locked: Boolean;
  password: string;
  time: string;
  date: string;
  windows: {
    uid: string;
    comp: any;
    title: string;
    posX: number;
    posY: number;
    width: number;
    height: number;
    maxW?: number;
    maxH?: number;
    minW?: number;
    minH?: number;
    resizable: Boolean;
  }[];
  apps: {
    name: string;
    icon: string;
    size: {
      minW: number;
      minH: number;
      maxW: number;
      maxH: number;
      W: number;
      H: number;
      resizable: Boolean;
    };
    comp: any;
  }[];
} = {
  locked: true,
  password: "",
  time: "",
  date: "",
  windows: [],
  apps: [
    {
      name: "Finder",
      icon: "/icons/files.webp",
      size: {
        W: 800,
        H: 500,
        minW: 600,
        minH: 300,
        maxW: 850,
        maxH: 600,
        resizable: true,
      },
      comp: "Finder",
    },
    {
      name: "Calculator",
      icon: "/icons/calculator.webp",
      size: {
        W: 300,
        H: 500,
        minW: 240,
        minH: 400,
        maxW: 300,
        maxH: 600,
        resizable: true,
      },
      comp: "Calculator",
    },
    {
      name: "TextEditor",
      icon: "/icons/text.webp",
      size: {
        W: 700,
        H: 400,
        minW: 700,
        minH: 400,
        maxW: 800,
        maxH: 600,
        resizable: true,
      },
      comp: "TextEditor",
    },
    {
      name: "Settings",
      icon: "/icons/settings.webp",
      size: {
        W: 650,
        H: 700,
        minW: 0,
        minH: 400,
        maxW: 800,
        maxH: 600,
        resizable: false,
      },
      comp: "Settings",
    },
  ],
};

export default ctx;
