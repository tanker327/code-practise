'use client';

import { useQuery } from '@tanstack/react-query';
import { mockSleep } from '../../app/new-bulk-uploader/mock-funs';

const startBulkActionProcessDownload = async (params: any) => {
  // TODO: Implement the logic to start the bulk action process download
  return mockSleep(params.id);
}

export const useBulkActionProcessDownload = (id: string) => {
  return useQuery({
    // Use a query key that includes the id to ensure uniqueness
    // and automatic refetching when the id changes.
    queryKey: ['mockSleep', id],
    // The query function calls mockSleep with the provided id.
    queryFn: () => startBulkActionProcessDownload(id),
  });
};
