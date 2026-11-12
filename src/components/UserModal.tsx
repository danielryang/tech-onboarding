import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Link
} from "@chakra-ui/react";
import { apiUrl, Service } from "@hex-labs/core"

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
        <Text>
            <b>Email:</b>{" "}
            <Link href={`mailto:${user.email}`} color="blue.500">
              {user.email}
            </Link>
          </Text>
          <Text><b>Phone:</b> {user.phoneNumber ?? "N/A"}</Text>
          <Text><b>User ID:</b> {user.userId}</Text>
          {/* resume is a file ID; /files/:id/view redirects to the file. Non-members can only
              view their own files, so others' resumes return 400 "You do not have access". */}
          <Text>
            <b>Resume:</b>{" "}
            {user.resume ? (
              <Link
                href={apiUrl(Service.FILES, `/files/${user.resume}/view`)}
                isExternal
                color="blue.500"
              >
                View Resume
              </Link>
            ) : (
              "N/A"
            )}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;