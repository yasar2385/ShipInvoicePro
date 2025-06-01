// lib/alert.js
import Swal from 'sweetalert2'

export const showAlert = (title, text, icon = 'info') => {
    return Swal.fire({
        title,
        text,
        icon,
        background: '#f8fafc', // Tailwind slate-50
        confirmButtonColor: '#2563eb', // Tailwind blue-600
        confirmButtonText: 'OK',
        customClass: {
            popup: 'rounded-xl shadow-lg',
            title: 'text-lg font-semibold text-red-600',
            confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        }
    })
}
