"use client";

import { useEffect, useState } from "react";

interface Payment {
  id: string;
  fields: {
    date: string;
    price: number;
  };
}

const BottomBar = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

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

  useEffect(() => {
    if (payments?.length > 0) {
      // Get the current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-indexed
      const currentYear = currentDate.getFullYear();

      const getTotalAmount = () => {
        return payments.reduce(
          (total, payment) => total + payment.fields.price,
          0
        );
      };

      const getTotalForMonth = (month: number, year: number) => {
        return payments
          .filter((payment) => {
            const [paymentYear, paymentMonth] = payment.fields.date
              .split("-")
              .map(Number);
            return paymentMonth === month && paymentYear === year;
          })
          .reduce((total, payment) => total + payment.fields.price, 0);
      };

      // Calculate total amount for the current month
      const monthTotal = getTotalForMonth(currentMonth, currentYear);
      setCurrentMonthTotal(monthTotal);

      // Calculate total amount for all payments
      const total = getTotalAmount();
      setTotalAmount(total);
    }
  }, [payments]);

  return (
    <div className="mt-7 flex flex-col gap-3 flex-wrap sm:flex-row">
      <div className="p-5 border rounded-2xl border-[grey] sm:w-[320px] md:w-[350px] bg-[#2020217e]">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold">Upcoming payouts</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="w-[20px] h-[20px]"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
          </svg>
        </div>
        <p className="text-[#939393] text-xs">
          Per brand based on the orders of the current month
        </p>

        <p className="text-white mt-4 text-3xl">$900</p>
      </div>
      <div className="p-5 border border-[grey]  rounded-2xl sm:w-[320px] md:w-[350px] bg-[#2020217e]">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold">This month orders</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="w-[20px] h-[20px]"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
          </svg>
        </div>
        <p className="text-[#939393] text-xs mt-1">
          Total order per brand for the current month
        </p>

        <p className="text-white mt-4 text-3xl">${currentMonthTotal}</p>
      </div>
      <div className="p-5 border rounded-2xl border-[grey] sm:w-[320px] md:w-[350px] bg-[#2020217e]">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold">Total orders</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="w-[20px] h-[20px]"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
          </svg>
        </div>
        <p className="text-[#939393] text-xs mt-1">
          All brands combined across all time
        </p>

        <p className="text-white mt-4 text-3xl">
          {payments ? payments.length : 0}
        </p>
      </div>
      <div className="p-5 border rounded-2xl border-[grey] sm:w-[320px] md:w-[350px] bg-[#2020217e]">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold">Total earnings</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="w-[20px] h-[20px]"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
          </svg>
        </div>
        <p className="text-[#939393] text-xs mt-1">
          All brands combined across all time
        </p>

        <p className="mt-4 text-3xl text-[#34bd5c]">+${totalAmount}</p>
      </div>
    </div>
  );
};

export default BottomBar;
