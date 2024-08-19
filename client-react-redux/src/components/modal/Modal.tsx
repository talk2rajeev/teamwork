import React, { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import * as coreComponents from '../../components/core-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrimaryBtnClick?: () => void;
  title?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: boolean;
}

const SIZE_MAP = {
  xxs: 'max-w-sm',
  xs: 'max-w-lg',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onPrimaryBtnClick,
  title,
  size = 'md',
  children,
  footer = false,
}) => {
  if (!isOpen) return null;
  const sizeClass = SIZE_MAP[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative bg-white rounded-lg shadow-lg max-w-lg w-full ${sizeClass}`}
      >
        <div className=" border-b p-4">
          <h2 className="text-center text-xl text-gray-700 font-semibold center">
            {title}
          </h2>
          <div className="absolute top-5 right-4">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <IoMdClose size="24" />
            </button>
          </div>
        </div>
        <div className="pl-4 pr-4 min-h-96 max-h-152 overflow-y-scroll">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-4 p-4 border-t">
            <div className="max-w-16">
              <coreComponents.Button
                label="Close"
                type="default"
                clickHandler={onClose}
              />
            </div>
            <div className="max-w-16">
              {onPrimaryBtnClick && (
                <coreComponents.Button
                  label="Submit"
                  type="primary"
                  clickHandler={onPrimaryBtnClick}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
