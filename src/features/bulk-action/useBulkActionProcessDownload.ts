'use client';

import { useQuery } from '@tanstack/react-query';
import { mockSleep } from './mock-funs';

// Define interface for parameters
interface StartProcessParams {
  id: string;
}

const startBulkActionProcessDownload = async (params: StartProcessParams) => {
  // TODO: Implement the logic to start the bulk action process download
  return mockSleep(params.id);
}

export const useBulkActionProcessDownload = (id: string) => {
  return useQuery({
    // Use a query key that includes the id to ensure uniqueness
    // and automatic refetching when the id changes.
    queryKey: ['mockSleep', id],
    // The query function calls mockSleep with the provided id.
    // Pass an object { id: id } to match the expected params structure
    queryFn: () => startBulkActionProcessDownload({ id: id }),
  });
};
