import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Toolbar.module.css";

interface Props {}
const pricingSorts = [
  { name: "Giá: Thấp đến cao" },
  { name: "Giá: Cao đến Thấp" },
];

export const Toolbar = (props: Props) => {
  const [selected, setSelected] = React.useState<null | any>(null);

  return (
    <div className="w-full flex flex-wrap items-center px-4 my-5 min-h-14 bg-[color:var(--secondary)] rounded-md">
      <span className="mr-3">Sắp xếp theo</span>
      <button className={`${styles["button--active"]} my-3`}>Phổ Biến</button>
      <button className={`${styles["button"]} my-3`}>Mới Nhất</button>
      <button className={`${styles["button"]} my-3`}>Bán Chạy</button>

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative inline-block mr-auto min-w-[167px] my-3">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {selected ? selected.name : "Giá"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {pricingSorts.map((pricing, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-[color:var(--text-color)] bg-[color:var(--secondary)]"
                        : "text-[color:var(--text-color)]"
                    }
                          cursor-default select-none relative py-2 pl-3 pr-4`
                  }
                  value={pricing}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-bold" : "font-normal"
                        } block truncate`}
                      >
                        {pricing.name}
                      </span>
                      {/* {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <FaCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <div className="flex items-center my-3">
        <span className="mr-3">
          <span className="text-[color:var(--primary)]">1</span>/2
        </span>
        <button className={`${styles["pagination-btn"]} rounded-l-md`}>
          <FaChevronLeft className="h-3 w-3" />
        </button>
        <button className={`${styles["pagination-btn"]} rounded-r-md`}>
          <FaChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
