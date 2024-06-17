import React, { FC } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  children: React.ReactNode;
}

const SIZE_MAP = {
  xxs: 'max-w-sm',
  xs: 'max-w-lg',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, size = 'md', children }) => {
  if (!isOpen) return null;
  const sizeClass = SIZE_MAP[size];

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-5/6 scroll scroll-smooth">
    //   <div className={`bg-white rounded-lg shadow-lg w-full p-4 ${sizeClass}`}>
    //     <div className="flex justify-between items-center border-b pb-2">
    //       <h2 className="text-xl font-semibold">{title}</h2>
    //       <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
    //         <IoMdClose />
    //       </button>
    //     </div>
    //     <div className="mt-4">
    //       {children}
    //     </div>
    //     <div className="mt-4 flex justify-end border-t pt-2">
    //       <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
    //         Close
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`relative bg-white rounded-lg shadow-lg max-w-lg w-full ${sizeClass}`}>
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <IoMdClose />
          </button>
        </div>
        <div className="pl-4 pr-4 min-h-28 max-h-152 overflow-y-auto">
          {children}
        </div>
        <div className="flex justify-end p-2 border-t">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;