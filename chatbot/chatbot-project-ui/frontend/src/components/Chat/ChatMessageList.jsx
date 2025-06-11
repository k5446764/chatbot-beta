// src/components/Chat/ChatMessageList.jsx - (수정됨)
import React from 'react';
import QuestionBalloon from '../Balloon/QuestionBalloon';
import BotMessages from '../Messages/BotMessages';
import LoadingBalloon from '../Balloon/LoadingBalloon';

function ChatMessageList({ data, uiTexts, favorite, onSend }) {
  return (
    // ▼ 수정된 부분: 패딩 클래스를 p-4 sm:p-5 로 단순화 및 반응형 적용
    <div className="p-4 sm:p-5 bg-gray-50 box-border overflow-y-auto flex-1">
      <div className="flex flex-col gap-2.5">
        {data.data.map((message, idx) => (
          <div key={idx} className="chat-message-group">
            {message.outputs ? (
              <BotMessages
                outputs={message.outputs}
                time={message.time}
                uiTexts={uiTexts}
                onQuickReply={onSend}
              />
            ) : message.input ? (
              <QuestionBalloon
                data={message.input}
                time={message.time}
                favorite={favorite}
              />
            ) : null}
          </div>
        ))}
        {data.isLoading && (
          <div className="chat-message-group">
            <LoadingBalloon uiTexts={uiTexts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessageList;