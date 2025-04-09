import { useQuery } from '@tanstack/react-query';

const loadData = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const useTestRequest = (count: number, isEnable: boolean) => {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['test', count],
    queryFn: () => loadData(count.toString()),
    enabled: isEnable && count !== null,
  });

  return { data, error, isLoading, isFetching };
};