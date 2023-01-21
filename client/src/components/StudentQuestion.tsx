import React from "react";

const StudentQuestion = () => {
  //Maybe form the questions here
  return (
    <div className="bg-black flex flex-col w-full h-screen justify-center items-center p-4">
      <button className="bg-black">Connect Wallet</button>
      <div className="bg-gray-600 rounded-lg items-center flex flex-col p-4 ">
        <h1>What is the colour of the sky?</h1>
        <ul>
          <li>Blue</li>
          <li>Green</li>
          <li>Yellow</li>
          <li>Black</li>
        </ul>
        <label className="text-white text-2xl p-2 flex">
          Option 4:
          <input
            type="checkbox"
            onChange={() => {}}
            placeholder="Option 4"
            required
            className={`text-black text-sm  font-normal mx-4 mb-4 p-2 border-none rounded
          `}
          />
        </label>
      </div>
    </div>
  );
};

export default StudentQuestion;
