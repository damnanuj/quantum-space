import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Input,
} from "@heroui/react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function CommentsModal({ post, isOpen, onOpen, onOpenChange }) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(post, "postsss");
  const { user, setUser } = useContext(UserContext);

  // console.log(user);

  return (
    <>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent className="bg-dark-extraLight ">
          {(onClose) => (
            <>
              <ModalHeader className="flex text-white p-3 flex-col gap-1 border-b-[0.5px] ">
                Comments
              </ModalHeader>
              <ModalBody className="px-3">
                <div className="w-full max-h-80 overflow-y-auto rounded-md p-2 ">
                  {post?.comments?.length > 0 ? (
                    post.comments.map((item, index) => (
                      <div className=" p-2  flex items-center  w-full gap-2 ">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                          <Image
                            src={user.profilePicture}
                            alt="profile"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className=" text-dark-text">
                          <div className="flex items-center gap-2">
                            <b>Anuj Kumar</b>
                            <p className="text-xs text-dark-notification">
                              10min ago
                            </p>
                          </div>
                          <p className="">{item?.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-center text-dark-notification italic">
                      Be the first to comment !
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="p-0 border-t-[0.5px]">
                <div className=" p-3 flex items-center justify-between w-full gap-2 ">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={user.profilePicture}
                      alt="profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    placeholder="Write something..."
                    className="flex-grow min-w-0 p-2 rounded-md bg-transparent border-[0.5px] text-dark-text focus:border-dark-notification focus:outline-none"
                  />
                  {/* <Button className="whitespace-nowrap"> */}
                  <div className="material-icons text-dark-notification cursor-pointer p-1  ">
                    send
                  </div>
                  {/* </Button> */}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
