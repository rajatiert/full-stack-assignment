"use client"
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { updateBook } from "@/api/api";
import { updateBookArray } from "@/utis/utility";

export default function EditBookModal({ open, setOpen, book , setBook , allBooks }) {
  const [formData, setFormData] = useState({
    title: book?.title,
    author: book?.author,
    genre: book?.genre,
    year: book?.year
  });

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    setFormData({ ...book });
  }, [book]);

  const handleUpdate = async () => {
    const updatedBook = await updateBook(formData);
    if (updatedBook) {
      setOpen(false);
      toast.success("Book details updated successfully");
      updateBookArray(allBooks,setBook,updatedBook);
    } else {
      toast.error("Oops some error occurred");
    }
  };

  return (
    <>
      <Toaster />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex items-center justify-center z-50"
          onClose={handleCloseModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative transform w-[45%] py-4 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
              <div className="flex flex-col gap-5 items-center">
                <h3 className="text-2xl font-bold leading-6 text-gray-900">
                  Update Book Details
                </h3>
              </div>
              <div className="flex flex-col gap-8 min-h-[300px] w-full max-w-sm mx-auto bg-white rounded-lg">
                <div className="mt-4 justify-center flex flex-col gap-0">
                  <div className="mb-2">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      autoComplete="off"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="author"
                      className="block text-gray-700 text-sm"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      autoComplete="off"
                      placeholder="Author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="genre"
                      className="block text-gray-700 text-sm"
                    >
                      Genre
                    </label>
                    <input
                      type="text"
                      id="genre"
                      name="genre"
                      autoComplete="off"
                      placeholder="Genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="year"
                      className="block text-gray-700 text-sm"
                    >
                      Year
                    </label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      autoComplete="off"
                      placeholder="Year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full gap-3">
                  <button
                    onClick={handleUpdate}
                    className="bg-black text-white px-4 py-2 rounded-lg w-full"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg w-full"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
