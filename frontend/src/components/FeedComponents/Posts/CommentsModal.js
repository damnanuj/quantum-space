import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function CommentsModal({ isOpen, onOpen, onOpenChange }) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex !bg-red-400 p-3 flex-col gap-1 border-b ">
                Comments
              </ModalHeader>
              <ModalBody className="px-3">
                <div className="w-full h-14 border-2 bg-red-400 border-green-600"></div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
