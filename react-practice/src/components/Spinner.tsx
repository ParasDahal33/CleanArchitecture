interface SpinnerProps {
      text: string | null;
      size: string;
      isLoading?: boolean;
}

export default function Spinner({ isLoading = true, text, size }: SpinnerProps) {
      if (!isLoading) return null;

      const header = text ? <h4>{text}</h4> : null;

      return (
            <div className="spinner">
                  {header}
                  <div className="loader" style={{ height: size, width: size }} />
            </div>
      );
}

Spinner.defaultProps = {
      size: "5em",
};
