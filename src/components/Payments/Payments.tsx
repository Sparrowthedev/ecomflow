"use client";
import useSWR from "swr";

interface Payment {
  id: string;
  fields: {
    date: string;
    price: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const Payments = () => {
  const { data, error } = useSWR("/api/payments", fetcher);

  return (
    <div className="px-7 lg:p-0 text-white">
      <h1 className="text-white mt-4 font-bold text-xl lg:text-2xl">
        All payments
      </h1>

      {data?.payment?.map((payment: Payment) => (
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
            <button>
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
