import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { listTopics } from "../../constants";
export interface MessageType {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  image?: File | null;
}

export const useHome = () => {
  const [query, setQuery] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatTopRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<File | null>();
  const [engine, setEngine] = useState<number>(0);
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [topics, setTopics] = useState<string[]>();
  const [showModal, setShowModal] = useState(false);
  const toggleDrawer = () => {
      setShowModal((prevState) => !prevState)
  }

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && query !== "") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "30px";
      }
      handleGetPrompt();
    }
  };

  useEffect(() => {
    if (messages.length <= 2) {
      chatTopRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (image) {
      objectUrl = URL.createObjectURL(image);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const [canDismiss, setCanDismiss] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (canDismiss && document.activeElement === textareaRef.current) {
        textareaRef.current?.blur();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canDismiss]);

  const handleFocus = () => {
    // Wait 300ms before enabling scroll-to-dismiss to avoid initial scroll firing
    setCanDismiss(false);
    setTimeout(() => setCanDismiss(true), 300);
  };

  const handleBlur = () => {
    setCanDismiss(false);
  };

  const handleGetPrompt = async (suggestion?: string) => {

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "30px";
      }
      textareaRef.current.blur();
    }
    setIsFirstLoad(false);
    setIsLoading(true);
    const userMessage: MessageType = {
      id: messages.length + 1,
      isUser: true,
      text: suggestion ? suggestion : query,
      image: image,
    };

    const loadingMessage: MessageType = {
      id: messages.length + 2,
      isUser: false,
      text: "...",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setQuery("");
    setImage(null);

    try {
      let res;
      if (!image) {
        res = await fetch(
          `https://ftmobile.inhealth.co.id/livia-ai/api/Gemini/text-only`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              prompt: suggestion ? suggestion : query,
            }),
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `HTTP ${res.status}`);
        }

        const data: any = await res.json(); // or `await res.json()` depending on your API

        setIsLoading(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessage.id
              ? { ...m, text: data.data.html, isLoading: false }
              : m
          )
        );
      } else {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("prompt", suggestion ? suggestion : query);

        res = await fetch(
          `https://ftmobile.inhealth.co.id/livia-ai/api/Gemini/text-and-image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `HTTP ${res.status}`);
        }

        const data: any = await res.json(); // or `await res.json()` depending on your API

        setIsLoading(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessage.id
              ? { ...m, image: image, text: data.data.html, isLoading: false }
              : m
          )
        );
      }
    } catch (err: any) {
      console.error("API Error:", err.message || err);
      setIsLoading(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessage.id
            ? { ...m, text: "Something went wrong.", isLoading: false }
            : m
        )
      );
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        if (file) {
          setImage(file);
          e.preventDefault(); // optional, to stop the image blob from going into the textarea
        }
      }
    }
  };

  function getRandomTopics(topics: string[], count = 5) {
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  useEffect(() => {
    const getNewToken = async () => {
      let res;
      res = await fetch(
        `https://ftmobile.inhealth.co.id/livia-ai/api/AuthToken/SW5pIGFkYWxhaCBrdW5jaSByYWhhc2lhLCB5YW5nIHN1ZGFoIGRpIGVua3JpcHNpIG1lbmdndW5ha2FuIGJhc2U2NC4gVG9sb25nIGRpamFnYSBiYWlrLWJhaWsgeWFhLg==`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setToken(data.data.token);
    };
    getNewToken();
    const randomTopics = getRandomTopics(listTopics);
    setTopics(randomTopics);
  }, []);

  return {
    textareaRef,
    chatTopRef,
    query,
    isFirstLoad,
    messages,
    handleInput,
    handleKeyDown,
    handleGetPrompt,
    chatEndRef,
    image,
    setImage,
    handlePaste,
    engine_index: engine,
    setEngine,
    handleFocus,
    handleBlur,
    isLoading,
    topics,
    showModal,
    toggleDrawer
  };
};
