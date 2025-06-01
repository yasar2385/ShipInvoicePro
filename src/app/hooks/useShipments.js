// hooks/useShipments.js
import useSWR from 'swr';
import { firestoreUtils } from '../lib/firestore';

const fetcher = () => firestoreUtils.getAll('shipments');

export function useShipments() {
    const { data, error, mutate } = useSWR('shipments', fetcher);

    return {
        shipments: data || [],
        isLoading: !error && !data,
        isError: error,
        mutate
    };
}

export function useShipment(id) {
    const fetcher = () => firestoreUtils.getById('shipments', id);
    const { data, error, mutate } = useSWR(id ? `shipment-${id}` : null, fetcher);

    return {
        shipment: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
}