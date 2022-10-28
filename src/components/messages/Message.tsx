import dayjs from 'dayjs';

const Message = (props: {
  message: { message: string; username: string };
  username: string;
}) => {
  return (
    <div
      className={`flex flex-row items-center 
        ${
          props.username === props.message.username
            ? 'justify-end'
            : 'justify-start'
        }
      } w-full`}
    >
      <div
        className={`flex flex-col items-start justify-start w-64 h-fit rounded-lg shadow-md mt-4 ${
          props.message.username === props.username
            ? 'mr-4 bg-blue-200'
            : 'ml-4 bg-white'
        } p-1`}
      >
        {/*  name and time in the same line at start and end */}
        <div className='flex flex-row items-center justify-between w-full px-2'>
          <p className='text-lg font-semibold text-red-500'>
            {props.message.username}
          </p>
          {/* display day and time in 24hr format */}
          <p className='text-sm'>{dayjs().format('DD/MM/YYYY h:mm A')}</p>
        </div>
        {/*  message below name and time and starts at left */}
        <p className='text-base px-2 break-words max-w-[16rem] mt-1'>
          {props.message.message}
        </p>
      </div>
    </div>
  );
};

export default Message;
