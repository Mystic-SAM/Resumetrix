import type { ReactNode } from "react";
import { useAccordion } from "./AccordionContext";

interface AccordionContentProps {
  itemId: string;
  children: ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = (accordionContentProps: AccordionContentProps) => {
  const { itemId, children, className = "" } = accordionContentProps;
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isActive ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}
        ${className}
      `}
    >
      <div className="px-4 py-3 ">{children}</div>
    </div>
  );
};