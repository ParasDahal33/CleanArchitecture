import { Modal } from "../modal/Modal";
import feedbackIcon from "../../assets/image/feedback.png";

interface IFeedBackModal {
      toShow: boolean;
      closeModal: () => void;
}

function FeedBackModal({ toShow, closeModal }: IFeedBackModal) {
      return (
            <Modal toShow={toShow} title="Feedback" size="w-[44%]" closeHandler={closeModal}>
                  <>
                        <header className="text-center flex flex-col gap-3">
                              <h1 className="text-4xl font-bold">Help us help you.</h1>
                              <p className=" text-3xl">Your feedback is important to us.</p>
                        </header>

                        <picture className="flex justify-center">
                              <img
                                    className="w-[20rem] 
                                          sm:w-[35rem] sm:h-[32rem]
                                    "
                                    src={feedbackIcon}
                                    alt="feedback-img"
                              />
                        </picture>

                        <footer className="flex flex-col gap-3">
                              <a
                                    href={import.meta.env.VITE_FEEDBACK_LINK}
                                    target="_blank"
                                    className="btn__feedback bg-primary p-2 text-base text-center rounded text-white cursor-pointer"
                                    onClick={closeModal}
                                    rel="noreferrer"
                              >
                                    Yes, I&apos;ll give feedback
                              </a>

                              <button
                                    className="text-primary bg-white border-0 text-base"
                                    onClick={closeModal}
                              >
                                    <u>No, thanks</u>
                              </button>
                        </footer>
                  </>
            </Modal>
      );
}

export default FeedBackModal;
