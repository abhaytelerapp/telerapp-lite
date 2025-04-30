import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Draggable from 'react-draggable';

// import Icon from '../Icon';
import Typography from '../Typography';

import './Modal.css';
import { useModal } from '../contextProviders';
import { IoMdClose } from 'react-icons/io';

if (typeof document !== 'undefined') {
  ReactModal.setAppElement(document.getElementById('root'));
}

const Modal = ({
  closeButton,
  shouldCloseOnEsc = true,
  isOpen,
  title,
  onClose,
  children,
  shouldCloseOnOverlayClick = true,
  movable = false,
  containerDimensions = null,
  contentDimensions = null,
}) => {
  const { hide } = useModal();

  const handleClose = () => {
    hide();
  };

  const renderHeader = () => {
    return (
      title && (
        <header className="dark:bg-secondary-dark bg-primary-light flex items-center rounded-tl rounded-tr px-[20px] py-[13px]">
          <Typography
            variant="h6"
            color="primaryLight"
            className="flex grow !leading-[1.2] dark:text-white text-black"
            data-cy="modal-header"
          >
            {title}
          </Typography>
          {closeButton && (
            // <Icon
            //   onClick={onClose}
            //   name="close"
            //   className="dark:text-white text-black cursor-pointer"
            // />
            <IoMdClose  className="dark:text-white text-black cursor-pointer" onClick={onClose} />
          )}
        </header>
      )
    );
  }
  const modalContent = (
    <>
      {renderHeader()}
      <section
        className={
          contentDimensions
            ? `ohif-scrollbar dark:bg-primary-dark bg-secondary-light overflow-y-auto ${contentDimensions}`
            : 'ohif-scrollbar modal-contents dark:bg-primary-dark bg-secondary-light overflow-y-auto telerapp-scrollbar rounded-bl rounded-br px-[20px] pt-2 pb-[20px]'
        }
      >
        {children}
      </section>
    </>
  );

  return (
    <ReactModal
      className={
        // containerDimensions
        //   ? `relative dark:text-white text-black outline-none ${containerDimensions} lg:w-10/12 xl:w-1/2`
        //   : 'relative max-h-full w-11/12 dark:text-white text-black outline-none lg:w-10/12 xl:w-9/12'
        'relative max-h-full w-11/12 dark:text-white text-black outline-none lg:w-10/12 xl:w-9/12'
      }
      overlayClassName={
        movable
          ? 'fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center py-16 pointer-events-none'
          : 'fixed top-0 left-0 right-0 bottom-0 z-50 bg-overlay flex items-center justify-center py-16'
      }
      shouldCloseOnEsc={shouldCloseOnEsc}
      onRequestClose={handleClose}
      isOpen={isOpen}
      title={title}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {/* {renderHeader()}
      <section className="telerapp-scrollbar modal-content dark:bg-primary-dark bg-secondary-light overflow-y-auto rounded-bl rounded-br px-[20px] pt-2 pb-[20px]">
        {children}
      </section> */}
      {movable ? (
        <Draggable
          handle=".drag-handle"
          defaultClassName="dark:bg-primary-dark bg-primary-light pointer-events-auto"
        >
          <div>{modalContent}</div>
        </Draggable>
      ) : (
        modalContent
      )}
    </ReactModal>
  );
};


Modal.propTypes = {
  closeButton: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  shouldCloseOnOverlayClick: PropTypes.bool,
  movable: PropTypes.bool,
  containerDimensions: PropTypes.string,
  contentDimensions: PropTypes.string,
};

export default Modal;
