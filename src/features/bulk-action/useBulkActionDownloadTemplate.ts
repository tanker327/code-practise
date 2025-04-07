'use client';

import { useBulkActionProcessDownload } from './useBulkActionProcessDownload';
import { useBulkActionStatusPolling } from './useBulkActionStatusPolling';
import { useBulkActionDownloadFile } from './useBulkActionDownloadFile';

// Define the params interface based on what's needed for process download
interface BulkActionDownloadParams {
  id: string;
  // Add any other required parameters here
}

// Define possible steps in the process
type ProcessStep = 'process' | 'polling' | 'download' | 'complete' | 'idle';

export const useBulkActionDownloadTemplate = (params: BulkActionDownloadParams) => {
  // Step 1: Process the download to get longId
  const processDownload = useBulkActionProcessDownload(params.id);
  const longId = processDownload.data;

  // Step 2: Poll for status until we get the download file key
  // Only enable when longId is available
  const statusPolling = useBulkActionStatusPolling(longId || '');
  const downloadFileKey = statusPolling.data?.status === 'success' ? statusPolling.data.id : undefined;

  // Step 3: Download the file using the key
  // Only enable when download file key is available
  const fileDownload = useBulkActionDownloadFile(downloadFileKey || '');

  // Combine status information from all three steps
  const isPending = processDownload.isPending ||
    (processDownload.isSuccess && statusPolling.isPending) ||
    (processDownload.isSuccess && statusPolling.isSuccess && fileDownload.isPending);

  const isError = processDownload.isError ||
    (processDownload.isSuccess && statusPolling.isError) ||
    (processDownload.isSuccess && statusPolling.isSuccess && fileDownload.isError);

  const rawError = processDownload.error || statusPolling.error || fileDownload.error;
  // Extract a serializable error message
  const errorMessage = rawError instanceof Error ? rawError.message : rawError ? String(rawError) : null;

  const isSuccess = processDownload.isSuccess &&
    statusPolling.isSuccess &&
    statusPolling.data?.status === 'success' &&
    fileDownload.isSuccess;

  // Current step tracking
  const currentStep: ProcessStep = processDownload.isPending ? 'process' :
    (processDownload.isSuccess && !downloadFileKey) ? 'polling' :
      (downloadFileKey && !fileDownload.isSuccess) ? 'download' :
        isSuccess ? 'complete' : 'idle';

  return {
    // Combined status
    isPending,
    isError,
    isSuccess,
    errorMessage,
    currentStep,

    // Individual query results for more detailed access
    processDownload,
    statusPolling,
    fileDownload,

    // Final data
    data: fileDownload.data
  };
};
