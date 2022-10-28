const User = (props: { user: { id: string; username: string } }) => {
  return (
    <div
      key={props.user.id}
      className='flex flex-col items-center justify-center w-48 h-24 bg-white rounded-lg shadow-md cursor-pointer mb-2'
    >
      <img
        src='assets/user.png'
        alt='user'
        className='w-10 h-10 rounded-full'
      />
      <p className='text-lg'>{props.user.username}</p>
    </div>
  );
};

export default User;
