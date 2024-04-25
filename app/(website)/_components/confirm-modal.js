'use client'
import React from 'react';
import { Modal, Button } from '@nextui-org/react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Title>Confirm Deletion</Modal.Title>
      <Modal.Content>
        Are you sure you want to delete this chapter?
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={onConfirm}>
        Confirm
      </Modal.Action>
    </Modal>
  );
}

export default ConfirmModal;
