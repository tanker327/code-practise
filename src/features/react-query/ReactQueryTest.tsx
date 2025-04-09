import React from 'react';

import { useQuery } from '@tanstack/react-query';



const loadData = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

type ReactQueryTestProps = {
  isEnable: boolean;
};


const ReactQueryTest = ({ isEnable }: ReactQueryTestProps) => {
  const [isEnableState, setIsEnableState] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const handleClick = (i: number) => {
    setCount(count + i);
  };
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['test', count],
    queryFn: () => loadData(count.toString()),
    enabled: isEnableState,
  });

  console.log(data, error, isLoading, isFetching);

  return (
    <div>
      <button onClick={() => setIsEnableState(!isEnableState)}>{isEnableState ? 'Disable' : 'Enable'}</button>
      <div>
        <span>Count:{count}</span>
        <button onClick={() => handleClick(1)}>+</button>
        <button onClick={() => handleClick(-1)}>-</button>
      </div>
      <h1>React Query Test</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Is Loading: {isLoading ? 'true' : 'false'}</p>
      <p>Is Fetching: {isFetching ? 'true' : 'false'}</p>
    </div>
  );
};

export default ReactQueryTest;