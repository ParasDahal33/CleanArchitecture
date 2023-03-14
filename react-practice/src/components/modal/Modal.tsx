import { Fragment, ReactElement } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface IModal {
      toShow: boolean;
      size: string; // format -> w-[size in %]
      title: string;
      closeHandler: () => void;
      children: ReactElement | undefined;
}

function Modal({ title, closeHandler, size, toShow, children }: IModal) {
      return (
            <Transition appear show={toShow} as={Fragment}>
                  <Dialog
                        as="div"
                        className="relative z-10 w-fit"
                        onClose={() => null} // this work like backDrop
                  >
                        <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                        >
                              <div className="fixed inset-0 bg-[#000000] bg-opacity-30 " />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                              <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                          as={Fragment}
                                          enter="ease-out duration-300"
                                          enterFrom="opacity-0 scale-95"
                                          enterTo="opacity-100 scale-100"
                                          leave="ease-in duration-200"
                                          leaveFrom="opacity-100 scale-100"
                                          leaveTo="opacity-0 scale-95"
                                    >
                                          <Dialog.Panel
                                                className={`flex flex-col gap-8 ${size} min-w-fit max-w-7xl  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                                          >
                                                <Dialog.Title
                                                      as="h3"
                                                      className="text-lg leading-6 text-default flex justify-between"
                                                >
                                                      <header className=" text-2xl font-medium tracking-wide">
                                                            {title}
                                                      </header>

                                                      <button
                                                            type="button"
                                                            className="hover:bg-mute-gray px-2 rounded-md font-bold"
                                                            onClick={closeHandler}
                                                      >
                                                            X
                                                      </button>
                                                </Dialog.Title>

                                                <Dialog.Description>{children}</Dialog.Description>
                                          </Dialog.Panel>
                                    </Transition.Child>
                              </div>
                        </div>
                  </Dialog>
            </Transition>
      );
}

interface IModalFooter {
      children: ReactElement | undefined;
}

function ModalFooter({ children }: IModalFooter) {
      return <footer className="w-full flex justify-end mt-6">{children}</footer>;
}

export { Modal, ModalFooter };
