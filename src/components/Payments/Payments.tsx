"use client";

import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

interface Payment {
  id: string;
  fields: {
    date: string;
    price: number;
  };
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const receiptRef = useRef(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch("/api/payments", {
        method: "GET",
      });
      const data = await res.json();
      setPayments(data.payment);
    };

    fetchPayments();
  }, []);

  const generateReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Calculate width and height of the PDF page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate width and height of the image
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Determine the scale factor to fit the image within the PDF page
        const widthScale = pdfWidth / imgWidth;
        const heightScale = pdfHeight / imgHeight;
        const scale = Math.min(widthScale, heightScale);

        // Calculate the new dimensions
        const imgScaledWidth = imgWidth * scale;
        const imgScaledHeight = imgHeight * scale;

        pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, imgScaledHeight);
        pdf.save(`receipt.pdf`);
      });
    }
  };


  return (
    <div className="px-7 lg:p-0 text-white">
      <h1 className="text-white mt-4 font-bold text-xl lg:text-2xl">
        All payments
      </h1>

      {payments.map((payment) => (
        <div
          key={payment.id}
          className="flex items-center justify-between mt-6 border-[grey] bg-[#2020217e] p-5 border rounded-2xl"
        >
          <div className="flex items-center gap-4 md:gap-10">
            <div className=" text-sm">
              <h3>Date </h3>
              <p>{payment.fields.date}</p>
            </div>
            <div className=" text-sm">
              <h3>Price</h3>
              <p>${payment.fields.price}</p>
            </div>
          </div>

          <div>
            <button onClick={() => generateReceipt()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffffff"
                className="w-[25px] h-[25px] cursor-pointer"
              >
                <path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payments;
