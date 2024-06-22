import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import PDFTemplate from './components/PDFTemplate';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">Invoice Generator</h1>
      </header>
      <main >
        <InvoiceForm onSubmit={handleFormSubmit} />
        {invoiceData && (
          <div className="mt-4">
            <InvoicePreview data={invoiceData} />
            <div className="mt-4 text-center">
              <PDFTemplate InvoiceData={invoiceData} date={invoiceData.date} time={invoiceData.time}  />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;