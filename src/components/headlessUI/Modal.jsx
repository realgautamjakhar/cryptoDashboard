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

  function closeModal() {
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
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white p-6 text-left align-middle  transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Transaction Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{buy.name}</p>
                    <p className="text-sm text-gray-500">{sell.name}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
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
