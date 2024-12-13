import React from "react";

const Inbox: React.FC = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/3 border-r border-gray-800">
        <div className="text-2xl font-extrabold text-start p-4">Messages</div>
        <div className="flex flex-col w-full justify-evenly items-center mt-16">
          <h1 className="text-3xl font-bold">Welcome to your inbox!</h1>
          <p className="mt-2 text-gray-400 text-center">
            Drop a line, share posts and more with private conversations between
            you and others on X.
          </p>
          <div className="text-start">
            <button className="mt-6 bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-blue-600">
              Write a message
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center ">
        <h2 className="text-3xl font-extrabold">Select a message</h2>
        <p className="mt-2 text-gray-400 text-start pl-12">
          Choose from your existing conversations, start a <br /> new one, or
          just keep swimming.
        </p>
        <button className="mt-6 bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-blue-600">
          New message
        </button>
      </div>
    </div>
  );
};

export default Inbox;
