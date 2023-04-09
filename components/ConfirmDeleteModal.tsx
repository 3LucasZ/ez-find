import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

type PageProps = {
  name: string;
  handleDelete: Function;
};
export default function ConfirmDeleteModal(props: PageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = () => {
    onClose();
    props.handleDelete();
  };
  return (
    <div>
      <IconButton
        onClick={onOpen}
        colorScheme="red"
        aria-label="delete"
        icon={<DeleteIcon />}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete {props.name} ?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              No
            </Button>
            <Button onClick={handleDelete} colorScheme="red" ml="2">
              I'm sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
