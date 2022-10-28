import User from './User';

const ConnectedUsers = (props: {
  connectedUsers: { id: string; username: string }[];
  currentUser: string;
}) => {
  return (
    <div className='w-1/4 h-screen bg-blue-200 overflow-y-auto'>
      <div className='flex flex-col items-center'>
        <img
          src='assets/user.png'
          alt='user'
          className='w-20 h-20 rounded-full mt-4'
        />
        <p className='text-xl mt-2'>{props.currentUser} (You)</p>
      </div>
      <div className='flex flex-col items-center mt-4'>
        <h1 className='text-2xl'>Connected Users</h1>
        <div className='flex flex-col items-center mt-4'>
          {props.connectedUsers.map((user) => (
            // constant width and height for the container
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectedUsers;
