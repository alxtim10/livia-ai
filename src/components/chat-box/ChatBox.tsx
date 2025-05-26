import { MessageType } from "../../pages/home/hooks";
import ChatBubble from "../chat-bubble/ChatBubble";

interface ChatBoxProps {
    messages: MessageType[]
}

const ChatBox = ({ messages }: ChatBoxProps) => {

    return (
        <section className="mb-44 mt-12 w-full">
            {messages.map((message, index) => (
                <div key={index} className={`${message.isUser ? 'justify-end' : 'justify-start'} flex items-center w-full mt-5`}>
                    <ChatBubble text={message.text} delay={10} isUser={message.isUser} isLoading={message.isLoading} image={message.image}/>
                </div>
            ))}
        </section>
    )
}

export default ChatBox