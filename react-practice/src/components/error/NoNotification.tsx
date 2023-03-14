import noNotificationImg from "../../assets/svg/no-notification.svg";

interface INoNotification {
      haveData: boolean;
      isStatusSucceed: boolean;
}

function NoNotification({ haveData, isStatusSucceed }: INoNotification) {
      if (!isStatusSucceed || !haveData) return null;

      return (
            <section className="flex flex-col gap-4">
                  <picture className="flex justify-center">
                        <img
                              className="w-40
                                    sm:w-60
                              "
                              src={noNotificationImg}
                              alt="no-notification"
                        />
                  </picture>

                  <h4 className="text-center font-semibold tracking-wide text-2xl">No Notifications</h4>

                  <p className="text-center text-lg">
                        Sorry, there are currently no notifications to display.
                        <br />
                        Please check back later
                  </p>
            </section>
      );
}

export default NoNotification;
