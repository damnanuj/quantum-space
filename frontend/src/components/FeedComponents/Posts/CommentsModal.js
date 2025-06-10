import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function CommentsModal({ post, isOpen, onOpen, onOpenChange }) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(post, "postsss");

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
                <div className="w-full h-14 border-2 bg-red-400 border-green-600">
                  {post?.comments?.map((item) => (
                    <p>{item.text}</p>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
