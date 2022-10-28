import { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import ConnectedUsers from './components/connectedUsers/ConnectedUsers';
import EnterUsername from './components/EnterUsername';
import Messages from './components/messages/Messages';

function App() {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(
    [] as { id: string; username: string }[]
  );
  const [messages, setMessages] = useState(
    [] as { message: string; username: string }[]
  );
  const [message, setMessage] = useState('');

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    if (socket.current) {
      socket.current.on('username-taken', () => {
        toast.error('Username is taken');
      });

      socket.current.on('username-accepted', () => {
        setConnected(true);
      });

      socket.current.on(
        'get-connected-users',
        (connectedUsers: { id: string; username: string }[]) => {
          setConnectedUsers(
            connectedUsers.filter((user) => user.username !== username)
          );
        }
      );

      socket.current.on(
        'receive-message',
        (message: { message: string; username: string }) => {
          setMessages((prev) => [...prev, message]);
        }
      );
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [username]);

  const handleConnect = () => {
    if (socket.current) {
      socket.current.emit('handle-connection', username);
    }
  };

  const handleSendMessage = () => {
    if (socket.current) {
      setMessages((prev) => [...prev, { message, username }]);
      socket.current.emit('message', { message, username });
    }
    setMessage('');
  };

  return (
    <div className='app'>
      {/* from styled with tailwindcss */}
      {!connected && (
        <EnterUsername
          username={username}
          setUsername={setUsername}
          handleConnect={handleConnect}
        />
      )}
      {/* if connected, show connected users in a vertical panel list on the left side with their avatar(assets/user.png) and username below it */}
      {/* avatar and username are in a container that is styled like a card */}
      {/* panel is always full height and scrollable if needed */}
      {/* {connected && (
        <div className='flex'>
          <div className='w-1/4 h-screen bg-gray-200 overflow-y-auto'>
            <div className='flex flex-col items-center'>
              <img
                src='assets/user.png'
                alt='user'
                className='w-20 h-20 rounded-full mt-4'
              />
              <p className='text-xl mt-2'>{username}</p>
            </div>
            <div className='flex flex-col items-center mt-4'>
              <h1 className='text-2xl'>Connected Users</h1>
              <div className='flex flex-col items-center mt-4'>
                {connectedUsers.map((user) => (
                  // constant width and height for the container
                  <div
                    key={user.id}
                    className='flex flex-col items-center justify-center w-48 h-24 bg-white rounded-lg shadow-md cursor-pointer'
                  >
                    <img
                      src='assets/user.png'
                      alt='user'
                      className='w-10 h-10 rounded-full'
                    />
                    <p className='text-lg'>{user.username}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}
      {connected && (
        <div className='flex'>
          <ConnectedUsers
            connectedUsers={connectedUsers}
            currentUser={username}
          />
          {/* <div className='flex flex-col items-center w-3/4 h-screen bg-gray-200'>
            <div className='flex flex-col items-center w-full h-3/4 overflow-y-auto'>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-${
                    message.username === username ? 'end' : 'start'
                  } w-full`}
                >
                  <div
                    className={`flex flex-col items-center justify-center w-48 h-24 bg-white rounded-lg shadow-md mt-4 ${
                      message.username === username ? 'mr-4' : 'ml-4'
                    }`}
                  >
                    <p className='text-lg'>{message.username}</p>
                    <p className='text-lg'>{message.message}</p>
                    <p className='text-xs'>{dayjs().format('h:mm A')}</p>
                  </div>
                </div>
              ))}
            </div>
            <form
              className='flex items-center justify-center w-full h-1/4 px-4'
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
                setMessage('');
              }}
            >
              <input
                type='text'
                className='w-3/4 h-12 rounded-lg border-2 border-gray-300 outline-none px-4 mr-2'
                placeholder='Type a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type='submit'
                className='w-1/4 h-12 bg-blue-500 text-white rounded-lg'
              >
                Send
              </button>
            </form>
          </div> */}
          <Messages
            messages={messages}
            username={username}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      )}
      <ToastContainer position='bottom-right' />
    </div>
  );
}

export default App;
