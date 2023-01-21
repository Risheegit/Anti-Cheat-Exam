import React from "react";
import StudentQuestion from "../components/StudentQuestion";

const StudentView = () => {
  return (
    <>
      <button className="bg-black">Connect Wallet </button>
      <StudentQuestion />
      <button>Next</button>
    </>
  );
};

export default StudentView;
