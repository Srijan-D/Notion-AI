"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterPage = (props: Props) => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("Maximize Productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Make your notes smarter.")
          .start();
      }}
      options={{
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default TypewriterPage;
