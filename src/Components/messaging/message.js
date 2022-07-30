import "../../css/messaging/message.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <p className="messageText">{message}</p>
        </div>
    </div>
  );
}
