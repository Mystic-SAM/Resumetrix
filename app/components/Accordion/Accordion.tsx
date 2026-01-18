import type { ReactNode } from "react";
import React, { useState } from "react";
import { AccordionContext } from "./AccordionContext";

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = (accordionProps: AccordionProps) => {
  const { children, defaultOpen, allowMultiple = false, className = "" } = accordionProps;
  const [activeItems, setActiveItems] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  const isItemActive = (id: string) => activeItems.includes(id);

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem, isItemActive }}>
      <div className={`space-y-2 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
