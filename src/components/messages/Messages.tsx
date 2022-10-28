import Message from './Message';
import { toast, ToastContainer } from 'react-toastify';

const Messages = (props: {
  messages: { message: string; username: string }[];
  username: string;
  handleSendMessage: Function;
  setMessage: Function;
  message: string;
}) => {
  return (
    <div className='flex flex-col items-start w-3/4 h-screen bg-gray-200'>
      <div className='flex flex-col items-start w-3/4 h-3/4 overflow-y-auto'>
        {props.messages.map((message, index) => (
          <Message key={index} message={message} username={props.username} />
        ))}
      </div>
      <form
        className='flex items-start justify-center w-full h-1/4 p-2'
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSendMessage();
        }}
      >
        {/* text area a submit on enter key */}
        <textarea
          className='w-3/4 h-full rounded-lg border-2 border-gray-300 outline-none p-2 mr-2 resize-none'
          placeholder='Type a message...'
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
          // message can't be empty and have only spaces or new lines
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (props.message.trim() === '') {
                toast.error('Message cannot be empty');
              }
              props.handleSendMessage();
            }
          }}
          required
        />
        <button
          type='submit'
          className='w-1/4 h-12 bg-blue-500 text-white rounded-lg'
        >
          Send
        </button>
      </form>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default Messages;
