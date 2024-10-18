import { classNames } from '@/lib/utils';
import React from 'react';
import Modal from 'react-modal';
import style from './style.module.css';

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  overlayClassName?: string;
};

const CustomModal = ({ isOpen, onRequestClose, overlayClassName, children }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Post Preview"
      className="modal"
      overlayClassName={classNames(style.modalOverlay, overlayClassName)}
    >
      <button onClick={onRequestClose} className="close-button">Close</button>
      {children}
    </Modal>
  );
};

export default CustomModal;