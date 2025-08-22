import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const items = [
  { name: "Walmart", day: "Today", price: 159.08 },
  { name: "Target", day: "Today", price: 19.57 },
  { name: "Best Buy", day: "Yesterday", price: 201 },
  { name: "JohnsConvenience #273", day: "2 days ago", price: 5.19 },
  { name: "Portfolio", day: "2 weeks", price: 789.5 },
];

const receipt = [
  { name: "2x Wilson Pickle Ball Racket", price: 98.19 },
  { name: "2x Pickle Balls", price: 25.15 },
  { name: "10x Prime Energy", price: 30.45 },
  { name: "Subtotal", price: 153.79 },
  { name: "Tax", price: 5.29 },
  { name: "Total", price: 159.08 },
];

const dataReceipt = [
  { name: "WILSON PICKLEBALL", price: 40.09 },
  { name: "WILSON PICKLEBALL", price: 40.09 },
  { name: "PICKLEBALL PREM", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
  { name: "PRIME ICEPOP", price: 12.75 },
];

export default function App() {
  const [viewModal, setViewModal] = useState(false);
  const [download, setDownload] = useState(false);

  return (
    <div
      onClick={() => setDownload(false)}
      className="w-screen h-screen bg-amber-50 flex justify-center items-center"
    >
      <main>
        {download && <FullReceipt />}
        <div
          onClick={() => setViewModal(false)}
          className="bg-stone-100 w-sm h-[450px] p-2 rounded-md border border-neutral-200 shadow-2xs overflow-scroll"
        >
          <h1 className="text-2xl mt-2 font-bold text-black">Transactions</h1>
          <div className="relative">
            {viewModal && <Modal viewFullReceipt={() => setDownload(true)} />}
            {items.map((item) => (
              <Transaction
                onClick={(e) => {
                  e.stopPropagation();
                  setViewModal(!viewModal);
                }}
                key={item.name}
                name={item.name}
                day={item.day}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const Transaction = ({
  name,
  day,
  price,
  onClick,
}: {
  name: string;
  day: string;
  price: number;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full justify-between items-center rounded-2xl px-4 py-2 my-4 cursor-pointer bg-stone-50"
    >
      <div className="w-full">
        <h2 className="font-bold text-xl text-black">{name}</h2>
        <p className="text-sm text-neutral-500">{day}</p>
      </div>
      <p className="font-bold text-2xl text-black">${price}</p>
    </div>
  );
};

const Modal = ({ viewFullReceipt }: { viewFullReceipt: () => void }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="p-4 rounded-2xl absolute bg-stone-50"
    >
      <header className="flex gap-14">
        <h1 className="text-blue-500 text-xl font-black">Walmart</h1>
        <p className="text-xs text-neutral-500 text-right">
          2100 Vista Way, Oceanside, CA 92054, United States
        </p>
      </header>
      <main>
        <p className="text-xs text-neutral-500">ITEMS PURCHASED</p>
        {receipt.map((item, i) => (
          <div
            key={item.name}
            className={clsx(
              "flex items-center justify-between my-1",
              i < 3 ? "w-full" : "ml-auto w-[200px]"
            )}
          >
            <p
              className={clsx(
                "text-base text-black",
                i < 3 ? "" : "text-right w-[80px]"
              )}
            >
              {item.name}
            </p>
            <p className="text-xl font-bold text-black">${item.price}</p>
          </div>
        ))}
      </main>
      <button
        onClick={viewFullReceipt}
        className="text-center text-white bg-stone-800 font-bold rounded-md w-full py-2 cursor-pointer"
      >
        Download Receipt
      </button>
    </motion.section>
  );
};

const FullReceipt = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    import("jsbarcode").then((JsBarcodeModule) => {
      const JsBarcode = JsBarcodeModule.default || JsBarcodeModule;
      if (canvasRef.current) {
        JsBarcode(canvasRef.current, "123456789012", {
          format: "EAN13",
          lineColor: "#000",
          width: 2,
          height: 60,
          background: "#e7e5e4",
          displayValue: false,
          fontSize: 14,
          margin: 10,
        });
      }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="receipt-shadow top-20 p-4 pt-10 w-[500px] h-[650px] fixed bg-stone-200 z-30 rounded-md"
    >
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-black text-black">Walmart</h1>
        <p className="my-2">friday, August 22, 2025 . 1:30 AM</p>
      </div>
      {dataReceipt.map((item, i) => (
        <div key={i} className="grid grid-cols-3">
          <p className="text-black/50 text-sm">{item.name}</p>
          <p className="text-black/50 text-sm text-end">
            {Math.floor(Math.random() * 900000000)
              .toString()
              .padEnd(9, "0")}
          </p>
          <p className="text-black text-sm text-end font-sans">${item.price}</p>
        </div>
      ))}
      <footer className="mt-4">
        <div className="flex justify-between">
          <p className="text-black/50 text-sm">ACCOUNT #</p>
          <p className="text-sm">{"1234".padStart(12, "*")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-black/50 text-sm">CARD TYPE</p>
          <p className="text-sm">VISA</p>
        </div>
        <div className="flex justify-between">
          <p className="text-black/50 text-sm">REF</p>
          <p className="text-sm">
            {Math.floor(Math.random() * 900000000)
              .toString()
              .padEnd(6, "0")}
          </p>
        </div>
        <h1 className="text-3xl text-center font-bold"># ITEMS SOLD 14</h1>
        <div className="w-full flex justify-center">
          <canvas ref={canvasRef}></canvas>
        </div>
      </footer>
      <div className="flex w-[500px] overflow-x-hidden -translate-x-4 translate-y-6">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="w-5 h-5 flex-none bg-stone-200 rotate-45" />
        ))}
      </div>
    </motion.div>
  );
};
