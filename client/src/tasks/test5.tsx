import React, { useState, useEffect } from 'react';

const Test5: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate an API call with a timeout
    const timer = setTimeout(() => {
      setData('Data fetched successfully!');
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{data}</p>}
    </div>
  );
};

export default Test5;
