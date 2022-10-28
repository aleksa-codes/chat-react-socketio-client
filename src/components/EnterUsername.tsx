import React from 'react';

const EnterUsername = (props: {
  username: string;
  setUsername: Function;
  handleConnect: Function;
}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form
        className='flex flex-col items-center justify-center w-96 p-8 space-y-4 bg-gray-100 rounded-md shadow-md'
        onSubmit={(e) => {
          e.preventDefault();
          props.handleConnect();
        }}
      >
        <h1 className='text-2xl font-bold'>Connect</h1>
        <input
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
          type='text'
          placeholder='Username'
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          required
        />
        <button
          className='w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
          type='submit'
        >
          Connect
        </button>
      </form>
    </div>
  );
};

export default EnterUsername;
