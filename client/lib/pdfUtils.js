import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate a PDF from an HTML element
 * @param {string} elementId - The ID of the HTML element to convert to PDF
 * @param {string} filename - The name of the PDF file to download
 */
export const generatePDFFromHTML = async (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID '${elementId}' not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false, // Disable logging
      allowTaint: true // Allow tainted canvas
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add subsequent pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

/**
 * Generate a medical report PDF directly using jsPDF
 * @param {Object} reportData - The data for the report
 */
export const generateMedicalReportPDF = (reportData) => {
  const { patientName, patientId, testName, category, bookingDate, scheduledDate, scheduledTime } = reportData;
  
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  let yPosition = 20;
  const lineHeight = 7;
  
  // Add header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Medical Test Report', margin, yPosition);
  yPosition += 15;
  
  // Add report date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Report generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 15;
  
  // Patient Information section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Patient Information', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  pdf.text(`Name: ${patientName}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Patient ID: ${patientId}`, margin, yPosition);
  yPosition += lineHeight * 2;
  
  // Test Information section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Test Information', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  pdf.text(`Test: ${testName}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Category: ${category}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Booking Date: ${bookingDate}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Scheduled Date: ${scheduledDate}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Scheduled Time: ${scheduledTime}`, margin, yPosition);
  yPosition += lineHeight * 2;
  
  // Test Results section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Test Results', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  pdf.text('✓ All parameters are within the normal reference range.', margin, yPosition);
  yPosition += lineHeight * 2;
  
  // Key Findings section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Key Findings:', margin, yPosition);
  yPosition += lineHeight;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  pdf.text('• No abnormalities detected', margin, yPosition);
  yPosition += lineHeight;
  pdf.text('• All values within expected limits', margin, yPosition);
  yPosition += lineHeight;
  pdf.text('• No immediate concerns identified', margin, yPosition);
  yPosition += lineHeight * 2;
  
  // Recommendations section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(44, 62, 80);
  pdf.text('Recommendations:', margin, yPosition);
  yPosition += lineHeight;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  pdf.text('• Follow-up recommended in 6 months', margin, yPosition);
  yPosition += lineHeight;
  pdf.text('• Maintain healthy lifestyle and diet', margin, yPosition);
  yPosition += lineHeight * 2;
  
  // Footer
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100, 100, 100);
  pdf.text('This is a computer-generated report and does not require a signature.', margin, yPosition);
  yPosition += lineHeight;
  pdf.text('Please consult with your healthcare provider to interpret these results.', margin, yPosition);
  
  // Save the PDF
  pdf.save(`${testName.replace(/\s+/g, '_')}_Report.pdf`);
};