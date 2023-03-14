interface IProfileText {
      label: string;
      data: string | undefined;
      className?: string;
      labelWidth?: string;
}

function ProfileText({ label, data, className, labelWidth = "sm:w-48" }: IProfileText) {
      return (
            <div
                  className="flex flex-col mb-4 pe-4 w-full 
                        sm:flex-row
                  "
            >
                  <section className={`sm:self-end ${labelWidth} flex font-semibold`}>
                        <p className="p-0 m-0">{label}</p>
                  </section>

                  <section className="flex flex-col gap-1 self-end w-full">
                        <p className={`m-0 ${className}`}>{data}</p>
                  </section>
            </div>
      );
}

export default ProfileText;
