import { useForm } from "react-hook-form";
import { IAddEditActionState2 } from "../../../model/actionModel";
import { IBrandRequestModel, IBrandResponseModel, IBrandSearchData } from "../../../model/brandModel";
import brandApiRequest from "../../../hooks/brand/brandApiRequest";
import { useURLQuery } from "../../../hooks/common/useURLQuery";
import { useEffect } from "react";
import { Modal, ModalFooter } from "../../../components/modal/Modal";
import { FieldStatus } from "../../../helpers/constants";
import Input from "../../../components/input/Input";
import { AddButtons, UpdateButtons } from "../../../components/buttons/ModalButtons";


type BrandDetailProps= {
    closeModal: () => void;
    addEditAction: IAddEditActionState2<IBrandResponseModel>;
};

export default function BrandModal({
     closeModal,
     addEditAction:{selectedData: selectedBrand, toShow, type: modalFor},
}: BrandDetailProps){
    const {
        reset,
        register,
        setValue,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<IBrandRequestModel>();
    const {addNewBrand, editBrand} = brandApiRequest();
    const {clearURLQuery} = useURLQuery<IBrandSearchData>();

    const formSubmitHandler = (newBrand: IBrandRequestModel) => {
        newBrand.name = newBrand.name;
        addNewBrand(newBrand).then(() => {
              closeModal();

              clearURLQuery();
        });
  };

  const formUpdateHandler = (updatedBrand: IBrandRequestModel): void=> {
    if (selectedBrand == null) return;
    updatedBrand.id = selectedBrand.id;
    editBrand(updatedBrand).then(()=> {
        closeModal();
    })
  };

  useEffect(() => {
    return () => {
          reset();
    };
}, []);

        return (
            <Modal
                size="w-[40%]"
                toShow={toShow}
                title={`${modalFor === FieldStatus.Add ? "Add new" : "Edit"} User`}
                closeHandler={closeModal}
            >
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <section className="flex flex-col gap-4 mb-5">
                            
                            
                                    <Input
                                        id="name"
                                        label="Name"
                                        isRequired={true}
                                        haveError={!!errors.name}
                                        errorMessage={errors.name?.message}
                                    >
                                        {register("name", {
                                                required: {
                                                    value: true,
                                                    message: "Cannot be empty !!",
                                                },
                                                setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                                value: selectedBrand?.name,
                                                maxLength: {
                                                    value: 100,
                                                    message: "Cannot be bigger than 100 characters. !!",
                                                },
                                        })}
                                    </Input>
                            
                        </section>

                        <ModalFooter>
                            <>
                                    {modalFor === FieldStatus.Add && (
                                        <AddButtons
                                                closeModal={closeModal}
                                                submitHandler={handleSubmit(formSubmitHandler)}
                                        />
                                    )}

                                    {modalFor === FieldStatus.Edit && (
                                        <UpdateButtons
                                                reset={reset}
                                                closeModal={closeModal}
                                                updateHandler={handleSubmit(formUpdateHandler)}
                                        />
                                    )}
                            </>
                        </ModalFooter>
                </form>
            </Modal>
        );

}