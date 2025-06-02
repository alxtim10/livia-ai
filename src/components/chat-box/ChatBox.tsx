import { MessageType } from "../../pages/home/hooks";
import ChatBubble from "../chat-bubble/ChatBubble";

interface ChatBoxProps {
    messages: MessageType[],
    handleRetry: any
}

const ChatBox = ({ messages, handleRetry }: ChatBoxProps) => {

    return (
        <section className="mb-44 mt-12 w-full">
            {messages.map((message, index) => (
                <div key={index} className={`${message.isUser ? 'justify-end' : 'justify-start'} flex items-center w-full mt-5`}>
                    <ChatBubble messages={message} delay={10} handleRetry={handleRetry}/>
                </div>
            ))}
        </section>
    )
}

export default ChatBox