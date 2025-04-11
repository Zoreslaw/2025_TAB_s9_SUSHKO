import React from 'react';

interface GreetingProps {
  name: string;
}

const Test2: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Test2;
