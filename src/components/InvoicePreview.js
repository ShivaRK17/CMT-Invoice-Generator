import React from 'react';

const InvoicePreview = ({ data }) => {
  const totalAmount = data.items.reduce((total, item) => total + item.quantity * item.price, 0);
  return (
    <div className="p-4 border bg-white shadow-md rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Invoice Preview</h2>
      <p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Time:</strong> {data.time}</p>
      <p><strong>Bill To:</strong> {data.billTo}</p>
      <table className="w-full mt-4 border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end'>
        <h4>Total : {totalAmount}</h4>
      </div>
    </div>
  );
};

export default InvoicePreview;
