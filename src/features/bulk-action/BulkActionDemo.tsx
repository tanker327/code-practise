'use client';

import { useState } from 'react';
import { useBulkActionDownloadTemplate } from './useBulkActionDownloadTemplate';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    color: '#333',
    marginBottom: '24px',
    borderBottom: '1px solid #eee',
    paddingBottom: '12px',
  },
  form: {
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    marginBottom: '8px',
    fontWeight: 500,
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#9eb6d3',
    cursor: 'not-allowed',
  },
  statusSection: {
    marginTop: '24px',
    padding: '16px',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
  },
  statusHeading: {
    fontSize: '18px',
    marginBottom: '16px',
    color: '#333',
  },
  statusItem: {
    display: 'flex',
    margin: '8px 0',
  },
  statusLabel: {
    fontWeight: 500,
    width: '180px',
    color: '#555',
  },
  statusValue: {
    color: '#333',
  },
  error: {
    color: '#e53e3e',
    backgroundColor: '#fff5f5',
    padding: '12px',
    borderRadius: '4px',
    marginTop: '16px',
  },
  success: {
    backgroundColor: '#f0fff4',
    padding: '16px',
    borderRadius: '4px',
    marginTop: '16px',
  },
  pre: {
    backgroundColor: '#f0f0f0',
    padding: '12px',
    borderRadius: '4px',
    overflow: 'auto',
    fontSize: '14px',
    marginTop: '8px',
  },
  detailedStatus: {
    marginTop: '20px',
    borderTop: '1px solid #eee',
    paddingTop: '16px',
  },
};

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Bulk Action Download Demo</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Enter ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            required
            style={styles.input}
            placeholder="Enter your ID here"
          />
        </div>
        <button
          type="submit"
          disabled={!id || (isPending && submittedId === id)}
          style={{
            ...styles.button,
            ...((!id || (isPending && submittedId === id)) ? styles.buttonDisabled : {})
          }}
        >
          {isPending && submittedId === id ? 'Processing...' : 'Start Download Process'}
        </button>
      </form>

      {submittedId && (
        <div style={styles.statusSection}>
          <h3 style={styles.statusHeading}>Status</h3>

          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Current Step:</span>
            <span style={styles.statusValue}>{currentStep}</span>
          </div>

          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Pending:</span>
            <span style={styles.statusValue}>{isPending ? 'Yes' : 'No'}</span>
          </div>

          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Success:</span>
            <span style={styles.statusValue}>{isSuccess ? 'Yes' : 'No'}</span>
          </div>

          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Error:</span>
            <span style={styles.statusValue}>{isError ? 'Yes' : 'No'}</span>
          </div>

          {isError && <div style={styles.error}>Error Message: {errorMessage}</div>}

          {isSuccess && data && (
            <div style={styles.success}>
              <h4>Download successful! ✅</h4>
              <p>Data received (e.g., file content or URL):</p>
              <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          <div style={styles.detailedStatus}>
            <h4 style={styles.statusHeading}>Detailed Status</h4>

            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>Process Download:</span>
              <span style={styles.statusValue}>{processDownload.isPending ? 'In Progress' : 'Completed'}</span>
            </div>

            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>Status Polling:</span>
              <span style={styles.statusValue}>{statusPolling.isPending ? 'In Progress' : 'Completed'}</span>
            </div>

            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>File Download:</span>
              <span style={styles.statusValue}>{fileDownload.isPending ? 'In Progress' : 'Completed'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionDemo;
