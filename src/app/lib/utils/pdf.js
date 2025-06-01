import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate PDF
const generatePDF = (formData) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Applicant Information', 10, 20);

    // Personal Details
    let yPosition = 30;
    doc.setFontSize(12);
    doc.text(`Name: ${formData.applicantName}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Age: ${formData.age}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Aadhar: ${formData.aadhar}`, 10, yPosition);

    // Family Members
    yPosition += 20;
    doc.setFontSize(14);
    doc.text('Family Members', 10, yPosition);

    yPosition += 10;
    formData.familyMembers.forEach((member, index) => {
        doc.setFontSize(12);
        doc.text(`Member ${index + 1}:`, 10, yPosition);
        yPosition += 10;
        doc.text(`Name: ${member.name}, Relation: ${member.relation}`, 15, yPosition);
        yPosition += 10;
    });

    // Save the PDF
    doc.save('applicant_details.pdf');
};

// Function to print form
const printForm = (formRef) => {
    window.print();
};

// Function to generate and save PDF
const handlePreviewAndSave = (formData) => {
    generatePDF(formData);
};

export {
    generatePDF,
    printForm,
    handlePreviewAndSave
};