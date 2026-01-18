import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  actions: ModalAction[];
  onClose: () => void;
};

const ConfirmModal = (modalProps: ConfirmModalProps) => {
  const {
    isOpen,
    title = "Confirm Action",
    description = "Are you sure you want to proceed?",
    actions,
    onClose,
  } = modalProps;
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap and restore
  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("overflow-hidden");
      return;
    }
    lastFocusedElement.current = document.activeElement as HTMLElement;
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>('button');

    focusableElements?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab" && focusableElements) {
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && e.target === first) {
          e.preventDefault();
          last.focus();
        } else if (e.target === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
      lastFocusedElement.current?.focus();
    };
  }, [isOpen, onClose]);

  const getButtonClasses = (type: ModalButtonType) => {
    switch (type) {
      case "positive":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "negative":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "neutral":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg z-10 max-w-md w-full p-6 mx-4 relative animate-in fade-in duration-200"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p id="modal-desc" className="text-gray-700 mb-6">
          {description}
        </p>

        <div className="flex justify-end gap-3 flex-wrap">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded ${getButtonClasses(action.buttonType)} ${action.classNames ?? ""}`}
              onClick={action.onClick}
            >
              {action.buttonText}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
