// =============================================================================
// 3. SWR HOOKS FOR DATA FETCHING
// =============================================================================

// hooks/useCustomers.js
import useSWR from 'swr';
import { firestoreUtils } from '../lib/firestore';

const fetcher = () => firestoreUtils.getAll('customers', 'companyName');

export function useCustomers() {
  const { data, error, mutate } = useSWR('customers', fetcher);

  return {
    customers: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

export function useCustomer(id) {
  const fetcher = () => firestoreUtils.getById('customers', id);
  const { data, error, mutate } = useSWR(id ? `customer-${id}` : null, fetcher);

  return {
    customer: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}