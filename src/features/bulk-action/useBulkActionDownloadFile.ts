'use client';

import { useQuery } from '@tanstack/react-query';
import { mockSleep } from "./mock-funs";

const downloadFile = async (downloadFileKey: string) => {
  // TODO: Implement the logic to download the file

  console.log('downloadFile', downloadFileKey);
  return mockSleep(downloadFileKey);
}

export const useBulkActionDownloadFile = (downloadFileKey: string) => {
  return useQuery({
    queryKey: ['downloadFile', downloadFileKey],
    queryFn: () => downloadFile(downloadFileKey),
    enabled: !!downloadFileKey,
  });
}


