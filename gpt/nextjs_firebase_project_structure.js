// Project Structure & Implementation Guide
// Next.js + Firebase Firestore Shipment & Invoice Management System

/*
Project Directory Structure:
shipment-invoice-system/
├── components/
│   ├── layout/
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   └── Footer.js
│   ├── customers/
│   │   ├── CustomerForm.js
│   │   ├── CustomerList.js
│   │   ├── CustomerCard.js
│   │   └── CustomerDetails.js
│   ├── shipments/
│   │   ├── ShipmentForm.js
│   │   ├── ShipmentList.js
│   │   ├── ShipmentCard.js
│   │   ├── TrackingStatus.js
│   │   └── ShipmentDetails.js
│   ├── invoices/
│   │   ├── InvoiceForm.js
│   │   ├── InvoiceList.js
│   │   ├── InvoiceCard.js
│   │   ├── InvoiceDetails.js
│   │   └── InvoicePDF.js
│   ├── dashboard/
│   │   ├── StatCard.js
│   │   ├── RecentActivity.js
│   │   ├── Charts.js
│   │   └── QuickActions.js
│   └── common/
│       ├── DataTable.js
│       ├── Modal.js
│       ├── LoadingSpinner.js
│       ├── SearchBar.js
│       └── Pagination.js
├── pages/
│   ├── api/
│   │   ├── customers/
│   │   │   ├── index.js
│   │   │   └── [id].js
│   │   ├── shipments/
│   │   │   ├── index.js
│   │   │   └── [id].js
│   │   └── invoices/
│   │       ├── index.js
│   │       ├── [id].js
│   │       └── [id]/pdf.js
│   ├── customers/
│   │   ├── index.js
│   │   ├── new.js
│   │   └── [id].js
│   ├── shipments/
│   │   ├── index.js
│   │   ├── new.js
│   │   └── [id].js
│   ├── invoices/
│   │   ├── index.js
│   │   ├── new.js
│   │   └── [id].js
│   ├── dashboard.js
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── lib/
│   ├── firebase.js
│   ├── firestore.js
│   └── utils.js
├── hooks/
│   ├── useCustomers.js
│   ├── useShipments.js
│   ├── useInvoices.js
│   └── useAuth.js
├── styles/
│   └── globals.css
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
└── .env.local
*/

// =============================================================================
// 1. FIREBASE CONFIGURATION
// =============================================================================

// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);

// =============================================================================
// 2. FIRESTORE UTILITIES
// =============================================================================

// lib/firestore.js
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export const firestoreUtils = {
  // Generic CRUD operations
  async create(collectionName, data) {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(collectionName, id) {
    await deleteDoc(doc(db, collectionName, id));
  },

  async getById(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  async getAll(collectionName, orderByField = 'createdAt') {
    const q = query(
      collection(db, collectionName),
      orderBy(orderByField, 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async search(collectionName, field, value) {
    const q = query(
      collection(db, collectionName),
      where(field, '==', value)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

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

// =============================================================================
// 4. MAIN LAYOUT COMPONENT
// =============================================================================

// components/layout/Layout.js
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}

// components/layout/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ShipManager
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, Admin</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// components/layout/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Customers', href: '/customers', icon: '👥' },
  { name: 'Shipments', href: '/shipments', icon: '📦' },
  { name: 'Invoices', href: '/invoices', icon: '🧾' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="flex flex-col h-full pt-16">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                router.pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

// =============================================================================
// 5. DASHBOARD PAGE
// =============================================================================

// pages/dashboard.js
import Layout from '../components/layout/Layout';
import { useCustomers } from '../hooks/useCustomers';
import { useShipments } from '../hooks/useShipments';
import { useInvoices } from '../hooks/useInvoices';

export default function Dashboard() {
  const { customers } = useCustomers();
  const { shipments } = useShipments();
  const { invoices } = useInvoices();

  const stats = [
    { name: 'Total Customers', value: customers.length, icon: '👥' },
    { name: 'Active Shipments', value: shipments.filter(s => s.status === 'in_transit').length, icon: '📦' },
    { name: 'Pending Invoices', value: invoices.filter(i => i.status === 'sent').length, icon: '🧾' },
    { name: 'Monthly Revenue', value: '$12,450', icon: '💰' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Recent Shipments</h2>
            <div className="space-y-3">
              {shipments.slice(0, 5).map((shipment) => (
                <div key={shipment.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{shipment.trackingNumber}</p>
                    <p className="text-sm text-gray-600">{shipment.customerInfo?.companyName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {shipment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
            <div className="space-y-3">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-600">{invoice.customerInfo?.companyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${invoice.totalAmount}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// =============================================================================
// 6. CUSTOMER MANAGEMENT
// =============================================================================

// pages/customers/index.js
import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useCustomers } from '../../hooks/useCustomers';

export default function Customers() {
  const { customers, isLoading } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <Link
            href="/customers/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Customer
          </Link>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{customer.companyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{customer.contactPerson}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/customers/${customer.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      View
                    </Link>
                    <Link href={`/customers/${customer.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

// =============================================================================
// 7. PACKAGE.JSON DEPENDENCIES
// =============================================================================

/*
{
  "name": "shipment-invoice-system",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "firebase": "^10.5.0",
    "swr": "^2.2.4",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1",
    "date-fns": "^2.30.0",
    "react-hook-form": "^7.47.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "eslint": "^8.52.0",
    "eslint-config-next": "14.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5"
  }
}
*/

// =============================================================================
// 8. DEPLOYMENT CONFIGURATION
// =============================================================================

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CUSTOM_KEY: 'my-value',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}