import { Fragment, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Loading from "../loading/Loading";

interface ChatBubbleProps {
    text: string;
    delay?: number;
    isUser: boolean;
    isLoading?: boolean;
    image?: File | null;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, delay = 20, isUser, isLoading, image }) => {
  
    const [htmlContent, setHtmlContent] = useState<any>('');

    useEffect(() => {
        setHtmlContent('')

        const html = text;
        const tokens = html.split(/(\s+|<[^>]+>)/).filter(Boolean);
        let index = 0;
        let accumulated = '';

        const interval = setInterval(() => {
            accumulated += tokens[index];
            setHtmlContent(accumulated);
            index++;
            if (index >= tokens.length) {
                clearInterval(interval);
            }
        }, delay)
    }, [text, delay])

    return (
        <Fragment>
            {!isUser && !isLoading && (
                <div
                    className={`rounded-2xl leading-relaxed h-fit text-black`}>
                    <div className='!text-[16px] leading-relaxed text-black
             [&_ul]:list-disc [&_ul]:pl-5
             [&_li]:list-item [&_li]:ml-3 [&_li:first-child]:mt-4 [&_li:last-child]:mb-4'
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            )}
            {!isUser && isLoading && (
                <Loading />
            )}
            {isUser && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-[#eeeeee] py-3 px-4 text-[16px] max-w-[300px] md:max-w-[420px] rounded-2xl flex flex-wrap gap-x-1`}>
                    {image ? (
                        <div className="flex flex-col gap-3">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="max-h-56  rounded-xl object-cover"
                            />
                            {text}
                        </div>
                    ) : (
                        <>
                            {text}
                        </>
                    )}
                </motion.div>
            )}
        </Fragment>
    )
};

export default ChatBubble;
