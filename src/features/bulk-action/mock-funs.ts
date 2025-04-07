"use client";

const SLEEP_TIME = 500;
// mock function to sleep 2 seconds then return the id
export const mockSleep = async (id: string) => {
  console.log('mockSleep', id);
  await new Promise(resolve => setTimeout(resolve, SLEEP_TIME));
  return id;
};

let counter = 0;

// mock function to sleep 1 seconds then return the an object with status and message
// if counter is mod by 4, return success, otherwise return error
export const getActionStatus = async (id: string) => {
  counter++;
  console.log('getActionStatus', id, counter, counter % 4 === 0 ? 'success' : 'pending');
  await new Promise(resolve => setTimeout(resolve, SLEEP_TIME));
  return { id, status: counter % 4 === 0 ? 'success' : 'error', message: 'Action completed' };
};


