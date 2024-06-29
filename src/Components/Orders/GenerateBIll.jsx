import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';
import logo from '../Images/logo.png'; // Adjust the path according to your project structure
import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';
import Bill from '../Images/bill.png';
import { useNavigate } from 'react-router-dom';

const GenerateBill = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = new URLSearchParams(window.location.search).get('id');
        if (!orderId) {
          navigate('/'); // Redirect if no order ID is found
          return;
        }

        const orderResponse = await axios.get(`https://localhost:7046/api/Order/GetOrderByID/${orderId}`);
        const orderData = orderResponse.data;
        setOrderDetails(orderData);

        const menuItemIds = JSON.parse(orderData.menuItemIds); // Parse the string array

        const menuItemPromises = menuItemIds.map(id =>
          axios.get(`https://localhost:7046/api/MenuItem/GetMenuItemById/${id}`)
        );
        const menuItemResponses = await Promise.all(menuItemPromises);
        setMenuItems(menuItemResponses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [navigate]);

  const generatePDF = async () => {
    const doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('Invoice', 40, 50);
    const img = new Image();
    img.src = logo;
    const originalWidth = 1177;
    const originalHeight = 273;
    const scaleFactor = 0.1; // Adjust scale as needed
    const newWidth = originalWidth * scaleFactor;
    const newHeight = originalHeight * scaleFactor;
    const xPosition = 50;
    const yPosition = 65;
    doc.setFillColor(0, 0, 0);
    doc.rect(xPosition - 10, yPosition - 10, newWidth + 20, newHeight + 20, 'F');
    doc.addImage(img, 'PNG', xPosition, yPosition, newWidth, newHeight);
    doc.setFontSize(12);
    doc.text('Eatwell', 40, 120);
    doc.text('Prishtina', 40, 135);
    doc.text('Rruga B', 40, 150);
    const date = new Date().toLocaleString();
    doc.text(`Date: ${date}`, 40, 165);
    const columns = [
      { header: 'Description', dataKey: 'description' },
      { header: 'Quantity', dataKey: 'quantity' },
      { header: 'Price', dataKey: 'price' },
      { header: 'Total', dataKey: 'total' }
    ];
    const rows = menuItems.map(item => ({
      description: item.name,
      quantity: 1, 
      price: item.price,
      total: item.price
    }));
    const totalAmount = rows.reduce((acc, row) => acc + row.total, 0);
    rows.push({
      description: 'Total',
      quantity: '',
      price: '',
      total: totalAmount
    });
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => Object.values(row)),
      startY: 180
    });
    const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/orders?orderid=${orderDetails.id}`);
    doc.addImage(qrCodeUrl, 'PNG', 450, 40, 100, 100); // Adjust the size and position as needed
    const pageHeight = doc.internal.pageSize.height;
    const finalY = pageHeight - 100; // Position signatures towards the bottom
    doc.text('Client Signature:', 40, finalY);
    doc.text('Eatwell LTD Signature:', 300, finalY);
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, pageHeight - 10, { align: 'center' });
    }
    doc.save('invoice.pdf');
  };

  return (
    <div className="bg-blue-900 flex flex-col justify-between text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center text-center items-center text-6xl italic my-8">
        <button onClick={generatePDF} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Generate Bill
        </button>
        <img className='w-72' src={Bill} alt="bill" />
      </div>
      <Footer />
    </div>
  );
};

export default GenerateBill;
