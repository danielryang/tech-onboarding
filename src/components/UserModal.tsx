import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";

type Props = {
  user: any;
  isOpen: boolean;
  onClose: () => void;
};

const UserModal: React.FC<Props> = ({ user, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${user.name.first} ${user.name.last}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text><b>Email:</b> {user.email}</Text>
          <Text><b>Phone:</b> {user.phoneNumber ?? "N/A"}</Text>
          <Text><b>User ID:</b> {user.userId}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;