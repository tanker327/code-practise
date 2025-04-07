'use client';
import { getActionStatus } from "../../app/new-bulk-uploader/mock-funs";
import { Query, useQuery } from "@tanstack/react-query";

// Define the shape of the status response
interface BulkActionStatusResponse {
  id: string;
  status: 'pending' | 'success' | 'error'; // Be more specific with status types
  message?: string; // Optional message field
  // Add other potential fields returned by the API
}

type BulkActionQueryKey = ['bulkActionStatus', string];

const checkBulkActionStatus = async (longId: string): Promise<BulkActionStatusResponse> => {
  // TODO: Implement the logic to check the bulk action status
  // Assuming getActionStatus returns an object like { status: 'pending' | 'success' | 'error', ... }
  const result = await getActionStatus(longId); // Assuming getActionStatus is correctly typed or returns `any` needing assertion
  // If getActionStatus isn't typed, you might need an assertion or validation here
  return result as BulkActionStatusResponse; // Or use a validation library like Zod
}


export const useBulkActionStatusPolling = (longId: string) => {
  return useQuery<BulkActionStatusResponse, Error, BulkActionStatusResponse, BulkActionQueryKey>({
    queryKey: ['bulkActionStatus', longId],
    queryFn: () => checkBulkActionStatus(longId),
    // Type the query parameter in the callback
    refetchInterval: (query: Query<BulkActionStatusResponse, Error, BulkActionStatusResponse, BulkActionQueryKey>) => {
      const data = query.state.data;
      // Stop polling if the status is 'success' or if there's no data
      if (!data || data.status === 'success') {
        return false;
      }
      // Otherwise, continue polling every 5 seconds
      return 5000;
    },
    // Optional: To prevent refetching when the window regains focus if polling is active
    refetchOnWindowFocus: false,
    // Only enable the query if longId is present
    enabled: !!longId,
  });
}
