import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { deposit, withdrew } from "../../features/userSlice";
import { error, success } from "../../utils/toast";

export default function Modal({
  isModalOpen,
  update,
  portfolio,
  amount,
  exchangedamount,
}) {
  const dispatch = useDispatch();
  const buy = useSelector((state) => state.exchange.buy);
  const sell = useSelector((state) => state.exchange.sell);

  function handleCancel() {
    toast(`Transaction Canceled`, error);
    update(false);
  }

  function handleConfirm() {
    if (!portfolio.length) {
      toast("You are Broke");
    }

    //Check weather user have selling coin and amount above the limit
    const coinExist = portfolio.find((coin) => coin.id === sell.id);

    if (coinExist) {
      dispatch(withdrew({ sell, amount: Number(amount) }));
      dispatch(deposit({ buy, depositedAmount: exchangedamount }));
      toast(
        `${exchangedamount} ${buy.name} Exchanged for ${amount} ${sell.name}`,
        success
      );
    }
    update(false);
  }
  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCancel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gradient1 p-6  text-white  transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium">
                    Transaction Details
                  </Dialog.Title>
                  <div className="font-base mt-6 grid place-content-center items-center gap-2 ">
                    <div className=" flex items-center gap-4">
                      <img
                        src={sell.image}
                        className="h-10 w-10"
                        alt={sell.name}
                      />
                      <p className="text-xl font-bold">{sell.name}</p>
                      <p className="font-semibold  capitalize">
                        {amount} {sell.symbol}
                      </p>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-10 w-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    </svg>
                    <div className=" flex items-center gap-2">
                      <img
                        src={buy.image}
                        className="h-10 w-10"
                        alt={buy.name}
                      />
                      <p className="text-xl font-bold">{buy.name}</p>
                      <p className="font-semibold  capitalize">
                        {exchangedamount} {buy.symbol}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full justify-around">
                    <button
                      type="button"
                      className="mx-auto h-fit  rounded-full px-4 py-2 font-semibold text-white hover:bg-accent/80 disabled:bg-transparent"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="mx-auto h-fit  rounded-full bg-accent px-4 py-2 font-semibold text-white hover:bg-accent/80 disabled:bg-transparent"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
