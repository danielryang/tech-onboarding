import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Link,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";
import { apiUrl, Service } from "@hex-labs/core";

type Props = {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  // Fetches the hexathons a user has applied to (implemented in UserData)
  getAppliedHexathons: (userId: string) => Promise<any[]>;
};

const UserModal: React.FC<Props> = ({ user, isOpen, onClose, getAppliedHexathons }) => {
  // Hexathons this user has applied to (null = not fetched yet)
  const [appliedHexathons, setAppliedHexathons] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleViewApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      setAppliedHexathons(await getAppliedHexathons(user.userId));
    } catch (err) {
      console.error(err);
      setError("Could not load applications.");
    } finally {
      setLoading(false);
    }
  };

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

          {/* Non-members can only see their own applications (the server overrides userId),
              so other users will usually show "No applications found". */}
          <Button mt={4} onClick={handleViewApplications} isLoading={loading}>
            View Hexathon Applications
          </Button>

          {error && <Text mt={2} color="red.500">{error}</Text>}
          {appliedHexathons && !loading && (
            appliedHexathons.length > 0 ? (
              <List mt={2} spacing={1}>
                {appliedHexathons.map((hexathon) => (
                  <ListItem key={hexathon.id ?? hexathon._id}>• {hexathon.name}</ListItem>
                ))}
              </List>
            ) : (
              <Text mt={2}>No applications found.</Text>
            )
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
