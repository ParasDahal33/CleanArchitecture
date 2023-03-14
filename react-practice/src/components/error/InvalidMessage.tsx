interface InvalidMessageProps {
      toShow: boolean;
      message: string | undefined;
}

function InvalidMessage({ toShow, message }: InvalidMessageProps) {
      if (!toShow) return null;

      return <div className="text-danger tracking-wide">{message}</div>;
}

export default InvalidMessage;
