import React, { FC, useState, useRef, useEffect } from 'react';

interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  type?: 'warning' | 'error' | 'primary' | 'default';
  title?: string;
  linkType?: 'button' | 'link';
  position?: string;
}

const Popover: FC<PopoverProps> = ({
  content,
  children,
  type = 'default',
  title,
  linkType = 'link',
  position,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {linkType === 'button' && (
        <button
          onClick={togglePopover}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {children}
        </button>
      )}
      {linkType === 'link' && (
        <span
          onClick={togglePopover}
          className=" text-slate-700 rounded hover:text-slate-600"
        >
          {children}
        </span>
      )}
      {isOpen && (
        <div className={`absolute z-10 mt-2 w-48 ${position}`}>
          <div className="relative bg-white border border-gray-200 rounded shadow-lg">
            {/* <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
            </div> */}
            <div>
              {/* <div className="border-b pb-2 mb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
              </div> */}
              <div>{content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
