import ChatBox from "../../components/chat-box/ChatBox";
import { ArrowUp, Info, Square, X } from "lucide-react";
import AttachButton from "../../components/attach-button/AttachButton";
import Dropdown from "../../components/dropdown/Dropdown";
import InfoDrawer from "../../components/drawer-info/InfoDrawer";
import Hero from "../../components/hero/Hero";
import LoadingMain from "../../components/loading/LoadingMain";
import { useHome } from "../home/hooks";
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const {
    textareaRef,
    query,
    isFirstLoad,
    messages,
    handleInput,
    handleKeyDown,
    handleGetPrompt,
    chatEndRef,
    chatTopRef,
    image,
    setImage,
    handlePaste,
    engine_index,
    setEngine,
    isLoading,
    topics,
    showModal,
    toggleDrawer,
    models,
    firstLoading,
    handleRetry,
    tipsPrompt
  } = useHome();

  return (
    <section className="flex items-center justify-center w-full">
      {!firstLoading ? (
        <div className="relative h-[100dvh] flex flex-col items-center justify-center bg-white p-3 w-full md:max-w-[780px]">
          <div ref={chatTopRef} />
          <header className="fixed top-0 py-3 px-4 font-semibold flex items-center gap-3 bg-white w-full md:max-w-[780px] z-10">
            {models && models.length > 0 && (
              <Dropdown engine_index={engine_index} setEngine={setEngine} models={models} />
            )}
            <div className="relative">
              <Info className="text-[#509EE3] w-5" onClick={() => {
                toggleDrawer();
              }}
              />
              <AnimatePresence>
                {tipsPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: -150 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -80 }}
                    transition={{ duration: 0.5 }}
                    className={`mt-2 absolute mb-2 text-center w-28 group-hover:block px-2 py-2 text-xs text-white bg-[#509EE3] rounded`}>
                    Tips Prompting
                    {/* Arrow */}
                    <div className="absolute bottom-full left-[10px] -translate-x-1/2 w-0 h-0 border-4 border-transparent border-b-[#509EE3]"></div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </header>
          <section
            className={`flex-1 overflow-y-auto w-full flex flex-col items-center justify-start px-1`}
          >
            {!isFirstLoad && (
              <section className="w-full flex items-center justify-center px-2 md:max-w-[780px]">
                <ChatBox messages={messages} handleRetry={handleRetry} />
              </section>
            )}
            <div ref={chatEndRef} />
          </section>

          <footer className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-white z-10 safe-bottom md:max-w-[780px]">
            {isFirstLoad && (
              <section className="w-full md:max-w-[780px] mb-10 flex flex-col items-start justify-center px-3">
                <Hero />
                <div className="flex flex-wrap gap-x-2 gap-y-3 max-w-fit mt-4">
                  {topics && topics.map((topic, index) => (
                    <div
                      key={index}
                      onClick={() => handleGetPrompt(topic)}
                      className="text-center cursor-pointer border rounded-full text-sm py-1 px-2 border-[#8ABEEC] text-[#8ABEEC]"
                      style={{
                        flexBasis: index < 3 ? "auto" : "auto", // all items auto width
                      }}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="px-3 pb-4 flex items-center justify-center">
              <div
                className="shadow-sm relative pb-12 p-5 bg-[#FBFCFF] border-[#ededed] border -mt-5
        w-full max-w-[740px] rounded-[24px] min-h-[90px] focus:outline-0 text-sm placeholder:text-sm"
              >
                {image && (
                  <div className="mb-2">
                    <div className="relative inline-block">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="max-h-16 rounded-xl border object-cover border-gray-300"
                      />
                      <button
                        onClick={() => setImage(null)}
                        className="absolute -top-1 -right-1 border border-[#aeaeae] bg-white text-[#212121] rounded-full p-1"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                )}
                <textarea
                  ref={textareaRef}
                  disabled={isLoading}
                  onInput={handleInput}
                  value={query}
                  onKeyDown={handleKeyDown}
                  // onFocus={handleFocus}
                  // onBlur={handleFocus}
                  rows={1}
                  onPaste={handlePaste}
                  placeholder="Tanya Livia"
                  className="outline-none focus:outline-none min-h-[30px] resize-none overflow-hidden text-[16px] transition-all duration-200  w-full bg-transparent placeholder:text-[#a3a3a3]"
                />
                {messages.length >= 2 &&
                  messages[messages.length - 1].isLoading ? (
                  <>
                    <Square
                      size={32}
                      className={`bg-[#e8e8e8] transition-all duration-50 
                absolute right-3 bottom-3 text-black rounded-full p-2  shadow-md`}
                    />
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleGetPrompt();
                    }}
                    className="inline-flex absolute right-3 bottom-3 gap-2 border bg-[#284F71] rounded-full hover:bg-white hover:shadow-md transition-all p-1 items-center text-sm font-medium"
                  >
                    <ArrowUp size={18} className="text-white" />
                  </button>
                )}
                <div className="absolute left-3 bottom-2">
                  <AttachButton onFileChange={setImage} />
                </div>
              </div>
            </div>
          </footer >
          <InfoDrawer closeModal={toggleDrawer} modalActive={showModal} />
        </div>
      ) : (
        <>
          <LoadingMain />
        </>)}

    </section>
  );
};

export default Home;
