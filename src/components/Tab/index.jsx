import { cn } from "@/utils";
import { createContext, useContext, useState } from "react";

const Context = createContext({});
export const Tab = ({ children, defaultAcitve }) => {
  const [active, setActive] = useState(defaultAcitve);
  return (
    <Context.Provider value={{ active, setActive }}>
      {children}
    </Context.Provider>
  );
};

Tab.Title = ({ children, value }) => {
  const { active, setActive } = useContext(Context);

  const onClick = (ev) => {
    ev.preventDefault();
    setActive?.(value);
  };
  return (
    <a
      onClick={onClick}
      className={cn("nav-link", { active: value === active })}
      href="#"
    >
      {children}
    </a>
  );
};

Tab.Content = ({ children, value }) => {
  const { active } = useContext(Context);
  return (
    <div className={cn("tab-pane fade", { "show active": active === value })}>
      {children}
    </div>
  );
};
