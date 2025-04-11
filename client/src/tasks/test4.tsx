import React, { useEffect, useState } from 'react';

const Test4: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  const handleClick = () => {
    setCount(prev => prev ? prev + 1 : 1);
  };

  useEffect(() => {
    alert('count is ' + count);
  },[count]);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default Test4;
