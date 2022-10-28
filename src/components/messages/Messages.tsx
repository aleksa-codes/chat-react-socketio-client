import Message from './Message';

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
        <input
          type='text'
          className='w-3/4 h-full rounded-lg border-2 border-gray-300 outline-none px-2 pb-32 mr-2'
          placeholder='Type a message...'
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
          required
        />

        <button
          type='submit'
          className='w-1/4 h-12 bg-blue-500 text-white rounded-lg'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
