import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { useAccordion } from "./AccordionContext";

interface AccordionHeaderProps {
  itemId: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = (accordionHeaderProps: AccordionHeaderProps) => {
  const { itemId, children, icon, className = "", iconPosition = "right", } = accordionHeaderProps;
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  const defaultIcon = (
    <svg
      className={cn("w-5 h-5 transition-transform duration-200", {
        "rotate-180": isActive,
      })}
      fill="none"
      stroke="#98A2B3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const toggleIcon: ReactNode = icon || defaultIcon;

  const handleClick = () => {
    toggleItem(itemId);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(`
        w-full px-4 py-3 text-left rounded-[8px]
        transition-colors duration-200 flex items-center justify-between cursor-pointer focus-visible:outline-offset-[-1px]
        ${className}
      `, { "rounded-b-none": isActive })}
    >
      <div className="flex items-center space-x-3">
        {iconPosition === "left" && toggleIcon}
        <div className="flex-1">{children}</div>
      </div>
      {iconPosition === "right" && toggleIcon}
    </button>
  );
};
