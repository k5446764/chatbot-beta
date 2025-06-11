// src/components/Messages/BotMessages.jsx
import React from 'react';
import SimpleText from '../Balloon/SimpleText';
import QuickReplies from './QuickReplies';
import BasicCard from '../Balloon/BasicCard';

function BotMessages({ outputs, uiTexts, onSend, onQuickReply, time }) {
  const handleQuickReplyClick = (reply) => {
    if (onQuickReply) {
      onQuickReply(reply);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 mb-2.5 fade-in">
      {outputs.map((output, i) => {
        const isLast = i === outputs.length - 1; // 마지막 메시지 여부

        if (output.type === 'text') {
          return (
            <SimpleText
              key={i}
              text={output.content}
              time={isLast ? time : null}
            />
          );
        } else if (output.type === 'card') {
          return (
            <BasicCard
              key={i}
              title={output.title}
              description={output.description}
              button={output.button}
            />
          );
        } else if (output.type === 'jsx') {
          return (
            <div
              key={i}
              className="
                bg-white/90 
                rounded-xl 
                p-2.5 
                max-w-[80%] 
                text-sm 
                leading-relaxed 
                shadow-sm
              "
            >
              {output.content}
              {isLast && (
                <div className="text-xs text-gray-500 mt-1">
                  {time}
                </div>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}

      {outputs[0]?.quickReplies && (
        <QuickReplies
          replies={outputs[0].quickReplies}
          onSelect={handleQuickReplyClick}
        />
      )}
    </div>
  );
}

export default BotMessages;
