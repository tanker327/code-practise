import React from 'react';
import { useTestRequest } from './useTestRequest';

type ReactQueryTestProps = {
  isEnable: boolean;
};

const ReactQueryTest = ({ isEnable }: ReactQueryTestProps) => {
  const [isEnableState, setIsEnableState] = React.useState(false);
  const [count, setCount] = React.useState<number|null>(null);
  const handleClick = (i: number) => {
    setCount(count === null ? i : count + i);
  };
  
  const { data, error, isLoading, isFetching } = useTestRequest(count === null ? 0 : count, isEnableState);

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