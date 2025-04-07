'use client';

import { useBulkActionProcessDownload } from './useBulkActionProcessDownload';
import { useBulkActionStatusPolling } from './useBulkActionStatusPolling';
import { useBulkActionDownloadFile } from './useBulkActionDownloadFile';
import { BulkActionStatus } from './BulkActionSchema'; // Import BulkActionStatus

// Define the params interface based on what's needed for process download
interface BulkActionDownloadParams {
  id: string;
  // Add any other required parameters here
}

// Define possible steps in the process
type ProcessStep = 'process' | 'polling' | 'download' | 'complete' | 'failed' | 'idle'; // Added 'failed'

export const useBulkActionDownloadTemplate = (params: BulkActionDownloadParams) => {
  // Step 1: Process the download to get longId
  const processDownload = useBulkActionProcessDownload(params.id);
  const longId = processDownload.data;

  // Step 2: Poll for status until we get the download file key
  // Only enable when longId is available
  const statusPolling = useBulkActionStatusPolling(longId || '');
  const pollingResponseData = statusPolling.data?.data; // Access nested data
  const isBackendSuccess = pollingResponseData?.status === BulkActionStatus.SUCCESS;
  const isProcessFailed = pollingResponseData?.status === BulkActionStatus.FAILED; // Check for failed status
  const downloadFileKey = isBackendSuccess ? pollingResponseData.bulkActionFileKey : undefined; // Access bulkActionFileKey

  // Step 3: Download the file using the key
  // Only enable when download file key is available and backend process succeeded
  const fileDownload = useBulkActionDownloadFile(downloadFileKey || ''); // Remove second argument

  // Combine status information from all three steps
  const isPending = processDownload.isPending ||
    (processDownload.isSuccess && statusPolling.isPending) || // Polling is pending
    (processDownload.isSuccess && isBackendSuccess && fileDownload.isPending); // Download is pending

  // Error includes query errors OR backend process failure
  const isQueryError = processDownload.isError ||
    (processDownload.isSuccess && statusPolling.isError) ||
    (processDownload.isSuccess && isBackendSuccess && fileDownload.isError); // Only check fileDownload error if backend was success

  const isError = isQueryError || isProcessFailed;

  // Extract a serializable error message
  const queryError = processDownload.error || statusPolling.error || fileDownload.error;
  let extractedErrorMessage: string | null = null;

  if (isProcessFailed && pollingResponseData) {
    // Prioritize errorList for specific error details
    if (pollingResponseData.errorList && pollingResponseData.errorList.length > 0) {
      extractedErrorMessage = pollingResponseData.errorList.map(e => e.description || e.error).join('; ');
    } else if (pollingResponseData.processingMessage) {
      // Fallback to processingMessage
      extractedErrorMessage = pollingResponseData.processingMessage;
    }
  }

  // If no backend error message, use query error message
  if (!extractedErrorMessage && queryError) {
    extractedErrorMessage = queryError instanceof Error ? queryError.message : queryError ? String(queryError) : null;
  }
  const errorMessage = extractedErrorMessage;

  // Success means all steps completed successfully, including backend process
  const isSuccess = processDownload.isSuccess &&
    statusPolling.isSuccess && // Polling query succeeded
    isBackendSuccess &&        // Backend process reported success
    fileDownload.isSuccess;    // File download query succeeded

  // Current step tracking
  const currentStep: ProcessStep = processDownload.isPending ? 'process' :
    isProcessFailed ? 'failed' : // Check for failed status first
      (processDownload.isSuccess && statusPolling.isPending) ? 'polling' :
        (processDownload.isSuccess && !isBackendSuccess && !isProcessFailed && !statusPolling.isError) ? 'polling' : // Still polling (not success, not failed, no query error)
          (isBackendSuccess && downloadFileKey && fileDownload.isPending) ? 'download' :
            (isBackendSuccess && downloadFileKey && !fileDownload.isSuccess && !fileDownload.isError) ? 'download' : // Still downloading (not success, no query error)
              isSuccess ? 'complete' :
                'idle'; // Default or initial state


  return {
    // Combined status
    isPending,
    isError,
    isSuccess,
    isProcessFailed, // Expose backend failure state
    errorMessage,
    currentStep,

    // Individual query results for more detailed access
    processDownload,
    statusPolling,
    fileDownload,

    // Final data (only relevant on success)
    data: isSuccess ? fileDownload.data : undefined // Return data only on overall success
  };
};
