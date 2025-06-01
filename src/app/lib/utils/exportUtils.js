// utils/exportUtils.js
export const exportToCsv = (data, fileName = 'export.csv') => {
    if (!data || !data.length) {
        console.error('No data to export');
        return;
    }

    // Get headers from first data item
    const headers = Object.keys(data[0])
        .filter(key => !key.includes('id')) // Exclude ID fields
        .map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

    // Map header keys
    const headerKeys = Object.keys(data[0]).filter(key => !key.includes('id'));

    // Create CSV content
    let csvContent = headers.join(',') + '\n';

    // Add data rows
    data.forEach(item => {
        const row = headerKeys.map(key => {
            // Handle values that might contain commas or quotes
            const value = item[key]?.toString() || '';
            const escapedValue = value.includes(',') || value.includes('"')
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            return escapedValue;
        });
        csvContent += row.join(',') + '\n';
    });

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}