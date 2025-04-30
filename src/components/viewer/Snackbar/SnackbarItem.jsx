import React, { useEffect } from 'react';
import classNames from 'classnames';
// import Icon from '../Icon';

import SnackbarTypes from './SnackbarTypes';
import { IoClose } from 'react-icons/io5';
import {
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { TiWarningOutline } from "react-icons/ti";
import { FaRegCheckCircle } from 'react-icons/fa';

const iconClasses = {
  [SnackbarTypes.INFO]: 'notifications-info',
  [SnackbarTypes.WARNING]: 'notifications-warning',
  [SnackbarTypes.SUCCESS]: 'notifications-success',
  [SnackbarTypes.ERROR]: 'notifications-error',
};

const typeIcons = {
  [SnackbarTypes.INFO]: <AiOutlineInfoCircle className="text-blue-700 h-5 w-5" />,
  [SnackbarTypes.SUCCESS]: <FaRegCheckCircle className="text-green-700 h-5 w-5" />,
  [SnackbarTypes.WARNING]: <TiWarningOutline  className="text-yellow-700 h-5 w-5" />,
  [SnackbarTypes.ERROR]: <AiOutlineCloseCircle className="text-red-700 h-5 w-5" />,
};

const SnackbarItem = ({ options, onClose }) => {
  const handleClose = () => onClose(options.id);

  useEffect(() => {
    if (options.autoClose) {
      setTimeout(() => handleClose(), options.duration);
    }
  }, []);

  const typeClasses = {
    [SnackbarTypes.INFO]: 'bg-[#bed1db]',
    [SnackbarTypes.WARNING]: 'bg-[#ebe5c4]',
    [SnackbarTypes.SUCCESS]: 'bg-[#c6d9bf]',
    [SnackbarTypes.ERROR]: 'bg-[#dabdbe]',
  };

  const hidden = 'duration-300 transition-all ease-in-out h-0 opacity-0 pt-0 mb-0 pb-0';

  return (
    <div
      className={classNames(`${options.visible ? '' : hidden} sb-item`, typeClasses[options.type])}
    >
      <div className="flex">
        {typeIcons[options.type]}
        <div className="mx-2 flex-col">
          {/* </span> */}
          {options.title && (
            <div className="break-normal text-lg font-bold text-black">{options.title}</div>
          )}
          {options.message && (
            <div className="break-normal text-base text-black">{options.message}</div>
          )}
        </div>
        <div
          onClick={handleClose}
          className="relative left-[3px] top-[-3px] ml-auto flex h-5 w-5 items-center justify-center self-start rounded-full text-[#0944b3]"
        >
          {/* <Icon
            name="close"
            className="text-black"
          /> */}
          <IoClose lassName="text-black"/>
        </div>
      </div>
    </div>
  );
};

export default SnackbarItem;
