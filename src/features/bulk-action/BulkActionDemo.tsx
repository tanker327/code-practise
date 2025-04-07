'use client';

import { useState } from 'react';
import { useBulkActionDownloadTemplate } from './useBulkActionDownloadTemplate';

const BulkActionDemo = () => {
  const [id, setId] = useState<string>('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    isPending,
    isError,
    isSuccess,
    errorMessage,
    currentStep,
    data,
    processDownload,
    statusPolling,
    fileDownload,
  } = useBulkActionDownloadTemplate({ id: submittedId || '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(id);
  };

  return (
    <div>
      <h2>Bulk Action Download Demo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter ID:
          <input
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            required
          />
        </label>
        <button type="submit" disabled={!id || (isPending && submittedId === id)}>
          {isPending && submittedId === id ? 'Processing...' : 'Start Download Process'}
        </button>
      </form>

      {submittedId && (
        <div>
          <h3>Status:</h3>
          <p>Current Step: {currentStep}</p>
          <p>Pending: {isPending ? 'Yes' : 'No'}</p>
          <p>Success: {isSuccess ? 'Yes' : 'No'}</p>
          <p>Error: {isError ? 'Yes' : 'No'}</p>
          {isError && <p style={{ color: 'red' }}>Error Message: {errorMessage}</p>}
          {isSuccess && data && (
            <div>
              <p>Download successful!</p>
              <p>Data received (e.g., file content or URL):</p>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          {/* Optionally display detailed status from individual hooks */}

          <h4>Detailed Status:</h4>
          <p>Process Download Pending: {processDownload.isPending ? 'Yes' : 'No'}</p>
          <p>Status Polling Pending: {statusPolling.isPending ? 'Yes' : 'No'}</p>
          <p>File Download Pending: {fileDownload.isPending ? 'Yes' : 'No'}</p>

        </div>
      )}
    </div>
  );
};

export default BulkActionDemo;
