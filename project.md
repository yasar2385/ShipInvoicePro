<!--
 shipment-invoice-system/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   └── register/
│   │   │       └── page.js
│   │   ├── (dashboard)/
│   │   │   ├── customers/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── error.js
│   │   │   │   └── page.js
│   │   │   ├── shipments/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   ├── track/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── error.js
│   │   │   │   └── page.js
│   │   │   ├── invoices/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   ├── pdf/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── error.js
│   │   │   │   └── page.js
│   │   │   ├── dashboard/
│   │   │   │   ├── loading.js
│   │   │   │   └── page.js
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── api/
│   │   │   ├── customers/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   ├── shipments/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   ├── invoices/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── pdf/
│   │   │   │   │   │   └── route.js
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       │   └── route.js
│   │   │       └── register/
│   │   │           └── route.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── error.js
│   │   ├── not-found.js
│   │   └── page.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   ├── Card.js
│   │   │   ├── Badge.js
│   │   │   ├── Table.js
│   │   │   ├── Pagination.js
│   │   │   ├── SearchBar.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── Toast.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   ├── DashboardLayout.js
│   │   │   ├── AuthLayout.js
│   │   │   └── Footer.js
│   │   ├── customers/
│   │   │   ├── CustomerForm.js
│   │   │   ├── CustomerList.js
│   │   │   ├── CustomerCard.js
│   │   │   ├── CustomerDetails.js
│   │   │   └── CustomerStats.js
│   │   ├── shipments/
│   │   │   ├── ShipmentForm.js
│   │   │   ├── ShipmentList.js
│   │   │   ├── ShipmentCard.js
│   │   │   ├── ShipmentDetails.js
│   │   │   ├── TrackingStatus.js
│   │   │   ├── TrackingTimeline.js
│   │   │   └── ShipmentStats.js
│   │   ├── invoices/
│   │   │   ├── InvoiceForm.js
│   │   │   ├── InvoiceList.js
│   │   │   ├── InvoiceCard.js
│   │   │   ├── InvoiceDetails.js
│   │   │   ├── InvoicePDF.js
│   │   │   ├── PaymentStatus.js
│   │   │   └── InvoiceStats.js
│   │   ├── dashboard/
│   │   │   ├── StatCard.js
│   │   │   ├── RecentActivity.js
│   │   │   ├── Charts.js
│   │   │   ├── QuickActions.js
│   │   │   └── Overview.js
│   │   └── auth/
│   │       ├── LoginForm.js
│   │       ├── RegisterForm.js
│   │       └── AuthGuard.js
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.js
│   │   │   ├── auth.js
│   │   │   ├── firestore.js
│   │   │   └── storage.js
│   │   ├── utils/
│   │   │   ├── format.js
│   │   │   ├── validation.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCustomers.js
│   │   │   ├── useShipments.js
│   │   │   ├── useInvoices.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useDebounce.js
│   │   └── services/
│   │       ├── customerService.js
│   │       ├── shipmentService.js
│   │       ├── invoiceService.js
│   │       ├── authService.js
│   │       └── emailService.js
│   └── types/
│       ├── customer.js
│       ├── shipment.js
│       ├── invoice.js
│       └── auth.js
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── placeholder.png
│   ├── icons/
│   │   ├── favicon.ico
│   │   └── apple-icon.png
│   └── manifest.json
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── vercel.json 

-->