import "./feedBackIcon.css";

function FeedBackIcon() {
      return (
            <div>
                  <a
                        className="floating tracking-wide px-3 py-1 
                              hover:underline
                        "
                        href={import.meta.env.VITE_FEEDBACK_LINK}
                        target="_blank"
                        rel="noreferrer"
                  >
                        Feedback
                  </a>
            </div>
      );
}

export default FeedBackIcon;
