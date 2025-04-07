'use client';
import { BulkActionResponseType, BulkActionStatus } from "./BulkActionSchema";
import { mockStatusData } from "./mock-data";
import { getActionStatus } from "./mock-funs";
import { Query, useQuery } from "@tanstack/react-query";


type BulkActionQueryKey = ['bulkActionStatus', string];

const checkBulkActionStatus = async (longId: string): Promise<BulkActionResponseType> => {
  // TODO: Implement the logic to check the bulk action status
  // Assuming getActionStatus returns an object like { status: 'pending' | 'success' | 'error', ... }
  await getActionStatus(longId); // Assuming getActionStatus is correctly typed or returns `any` needing assertion
  // If getActionStatus isn't typed, you might need an assertion or validation here

  const newResult: BulkActionResponseType = {
    data: mockStatusData
  }

  return newResult; // Or use a validation library like Zod
}


export const useBulkActionStatusPolling = (longId: string) => {
  return useQuery<BulkActionResponseType, Error, BulkActionResponseType, BulkActionQueryKey>({
    queryKey: ['bulkActionStatus', longId],
    queryFn: () => checkBulkActionStatus(longId),
    // Type the query parameter in the callback
    refetchInterval: (query: Query<BulkActionResponseType, Error, BulkActionResponseType, BulkActionQueryKey>) => {
      const responseData = query.state.data; // Renamed for clarity
      // Stop polling if the status is 'Success' or "failed "
      if (responseData?.data?.status === BulkActionStatus.SUCCESS || responseData?.data?.status === BulkActionStatus.FAILED) { // Updated check
        return false;
      }
      // Otherwise, continue polling every 5 seconds
      return 500;
    },
    // Optional: To prevent refetching when the window regains focus if polling is active
    refetchOnWindowFocus: false,
    // Only enable the query if longId is present
    enabled: !!longId,
    // error handling
  });
}
