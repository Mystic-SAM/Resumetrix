import type { ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = (accordionItemProps: AccordionItemProps) => {
  const { children, className = "" } = accordionItemProps;
  return (
    <div className={`overflow-hidden border-1 rounded-[8px] border-gray-200 ${className}`}>
      {children}
    </div>
  );
};