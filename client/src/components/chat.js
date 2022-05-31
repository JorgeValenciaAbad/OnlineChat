import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"; 
import { AiOutlineSend } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

export default function Chat({ socket, username, nameRoom }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: nameRoom,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };
    const disconnect = () => {
        if (currentMessage !== "") {
            socket.emit("disconnect");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);


    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>{nameRoom}</p>
                
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                <div className="bubble">
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" value={currentMessage} placeholder="Message" onChange={(event) => { setCurrentMessage(event.target.value);}} onKeyPress={(event) => {event.key === "Enter" && sendMessage();}}/>
                <button onClick={sendMessage}><AiOutlineSend/></button>
            </div>
        </div>

    );
}