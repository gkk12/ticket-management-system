import React from 'react';
import ContextMessage from '../contextMessage';

interface ContextMessagesProps {
  contextMessages: string[];
  setError: (error: string | null) => void;
}

const ContextMessages: React.FC<ContextMessagesProps> = ({
  contextMessages,
  setError
}) => {

  return (
    <div>
        <div>
          <ol>
            {contextMessages.map((context_message: string) => (
              <ContextMessage contextMessage={context_message} setError={setError} />
            ))}
          </ol>
        </div>
    </div>
  );
};

export default ContextMessages;