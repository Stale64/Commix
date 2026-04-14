import { useEffect, useState } from "react";
import Styles from "../../styles/global.module.css";
import { Icons } from "../../constants/image-strings";
import { useWebSocket } from "../../context/WebSocketContext";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { chatApi } from "../../api/chatApi";
import { useChat } from "../../context/ChatContext";

/** Sample thread: `from` = peer, `to` = current user */
const PSEUDO_CONVERSATION = [
  { role: "from", message: "Hey — are you free for a quick sync this afternoon?" },
  { role: "to", message: "Yeah, I can do 3pm. Does that work on your side?" },
  { role: "from", message: "Perfect. I'll send a calendar invite. Main topic is the dashboard rollout." },
  { role: "to", message: "Sounds good. I'll skim the spec before we meet." },
  { role: "from", message: "Great. Also, did you get a chance to look at the API error from yesterday?" },
  { role: "to", message: "Just saw it. Looks like a timeout on the auth refresh — I'll add a note in the ticket." },
  { role: "from", message: "Awesome, thanks. Talk at 3 👍" },
  { role: "from", message: "Hey — are you free for a quick sync this afternoon?" },
  { role: "to", message: "Yeah, I can do 3pm. Does that work on your side?" },
  { role: "from", message: "Perfect. I'll send a calendar invite. Main topic is the dashboard rollout." },
  { role: "to", message: "Sounds good. I'll skim the spec before we meet." },
  { role: "from", message: "Great. Also, did you get a chance to look at the API error from yesterday?" },
  { role: "to", message: "Just saw it. Looks like a timeout on the auth refresh — I'll add a note in the ticket." },
  { role: "from", message: "Awesome, thanks. Talk at 3 👍" },
];

function ChatWindow({ username }) {
    const [draft, setDraft] = useState("");

    const { sendPrivateMessage } = useWebSocket();

    const { user } = useAuth();

    const { triggerAlert } = useAlert();

    const { messages, setMessages } = useChat();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!username || !user?.username) return;
            try {
                const { data } = await chatApi.getAllMessages(user.username, username);
                setMessages(Array.isArray(data) ? data : []);
            } catch (error) {
                triggerAlert("Error while fetching messages", "danger");
            }
        };
        fetchMessages();
    }, [username, user?.username, setMessages, triggerAlert]);

    const handleSend = () => {
        const message = draft.trim();
        if (!message.length) {
            triggerAlert("Message should not be empty", "danger");
            return;
        }
        if (!username) {
            triggerAlert("Select a contact first", "danger");
            return;
        }
        const payload = {
            sender: user.username,
            receiver: username,
            message,
        };
        sendPrivateMessage(payload);
        setMessages((prev) => [
            ...(prev ?? []),
            {
              sender: user.username,
              message,
              timestamp: new Date().toISOString(),
            },
        ]);
        setDraft("");
    };

    if (!username) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center col-6 text-secondary p-4">
                Select a contact to start chatting
            </div>
        );
    }

    const thread = messages ?? [];

    return (
        <>
            <div className="d-flex flex-column justify-content-between col-6">
                <div className="p-4">
                    <div className="d-flex align-items-center">
                        <div className={`bg-primary rounded-circle text-white ${Styles.profileImage}`}>{username[0]}</div>
                        <div className="text-primary ms-2">{username}</div>
                        <div className="bg-success rounded-circle ms-3" style={{width: "12px", height: "12px"}}></div>
                        <div className="ms-auto">
                            <img src={Icons.Search1} className="ms-2" role="button" alt=""/>
                            <img src={Icons.Like} className="ms-2" role="button" alt=""/>
                            <img src={Icons.Bell} className="ms-2" role="button" alt=""/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={Styles.chatScrollArea}>
                        {thread.map((data, index) =>
                            data.sender === user.username ? (
                                <ToMessage key={index} username={data.sender} message={data.message} time={data.timestamp}/>
                            ) : (
                                <FromMessage key={index} username={data.sender} message={data.message} time={data.timestamp}/>
                            )
                        )}
                    </div>
                </div>
                <div className="p-3" style={{ backgroundColor: "#DCE8FF" }}>
                    <div className="input-group">
                        <input
                            id="messageField"
                            className="form-control rounded-start-pill"
                            type="text"
                            placeholder="Type your message"
                            aria-label="Message"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSend();
                            }}
                        />
                        <button onClick={() => handleSend()} className={`btn btn-primary rounded-end-pill ${draft.trim().length === 0 ? 'disabled' : ''}`} type="button">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function FromMessage(prop) {
    return (
        <>
            <div className="d-flex mb-3">
              <div className="d-flex flex-shrink-0 justify-content-center align-items-center align-self-end bg-primary rounded-circle text-white" style={{width: "25px", height: "25px", fontSize: "12px"}}>{prop.username[0]}</div>
              <div className={`ms-2 px-3 py-2 ${Styles.fromMessageBorderRadius}`} style={{backgroundColor: "#DCE8FF", maxWidth: "50%"}}>{prop.message}
                <div className="mt-2" style={{fontSize: "12px", fontWeight: "100"}}>{prop.time}</div>
              </div>
            </div>
        </>
    );
}

function ToMessage(prop) {
    return (
        <>
            <div className="d-flex mb-3 w-100 justify-content-end align-items-end">
              <div className={`me-2 px-3 py-2 w-50 bg-primary text-white ${Styles.toMessageBorderRadius}`} style={{maxWidth: "50%"}}>{prop.message}
              <div className="mt-2" style={{fontSize: "12px", fontWeight: "100"}}>{prop.time}</div>
              </div>
              <div className="d-flex flex-shrink-0 justify-content-center align-items-center bg-primary rounded-circle text-white" style={{width: "25px", height: "25px", fontSize: "12px"}}>{prop.username[0]}</div>
            </div>
        </>
    );
}

export default ChatWindow;