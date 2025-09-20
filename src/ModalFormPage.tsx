import { useState, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { openFormModal, closeFormModal, subscribeFormModal } from "./service";

import { type FormData } from "./model/schema";

const ModalFormPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeFormModal((isOpen) => {
      setIsModalOpen(isOpen);
    });

    return unsubscribe;
  }, []);

  const handleOpenModal = async () => {
    try {
      const result = await openFormModal();

      if (result) {
        setSubmittedData(result);
      }
    } catch (error) {
      console.error("모달 오류:", error);
    }
  };

  const handleModalClose = () => {
    closeFormModal(null);
  };

  const handleModalSubmit = (data: FormData) => {
    closeFormModal(data);
  };

  return (
    <div className="p-10 font-system max-w-4xl mx-auto h-[2000px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">모달 폼</h1>

      <button
        onClick={handleOpenModal}
        className="bg-blue-600 text-white border-none px-6 py-3 rounded-md font-medium cursor-pointer mb-8 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Open Modal
      </button>

      {submittedData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h2 className="m-0 mb-3 text-blue-900 font-semibold">제출된 정보</h2>
          <dl className="m-0">
            <dt className="font-semibold mb-1 text-gray-700">이름:</dt>
            <dd className="m-0 mb-3 ml-4 text-gray-600">
              {submittedData.name}
            </dd>

            <dt className="font-semibold mb-1 text-gray-700">이메일:</dt>
            <dd className="m-0 mb-3 ml-4 text-gray-600">
              {submittedData.email}
            </dd>

            <dt className="font-semibold mb-1 text-gray-700">메시지:</dt>
            <dd className="m-0 ml-4 text-gray-600">{submittedData.message}</dd>
          </dl>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default ModalFormPage;
