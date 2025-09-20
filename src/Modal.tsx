import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./model/schema";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
};

export const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    const title = titleRef.current;

    if (!dialog) return;

    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      dialog.showModal();
      reset();
      // 애니메이션 트리거
      requestAnimationFrame(() => {
        setIsAnimating(true);
        title?.focus();
      });
      return;
    }

    setIsAnimating(false);
    dialog.close();

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset]);

  const handleCancel = (e: React.SyntheticEvent) => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    const dialog = dialogRef.current;

    if (dialog && e.target === dialog) {
      onClose();
    }
  };

  const onSubmitForm = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`p-0 border-none rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        isAnimating
          ? "animate-in fade-in zoom-in-95 duration-200"
          : "opacity-0 scale-95"
      }`}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      role="dialog"
    >
      <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto flex flex-col">
        <header className="flex justify-between items-center p-6 pb-4 border-b border-gray-200">
          <h2
            ref={titleRef}
            id="modal-title"
            className="text-xl font-semibold text-gray-900 outline-none focus:text-blue-600"
            tabIndex={-1}
          >
            연락처 정보 입력
          </h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded p-1 text-2xl leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClose}
            aria-label="모달 닫기"
          >
            ×
          </button>
        </header>

        <div
          id="modal-description"
          className="px-6 mt-2 pb-4 text-sm text-gray-600"
        >
          아래 양식을 작성하여 정보를 제출해주세요.
        </div>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="px-6 pb-6 flex-1 overflow-y-auto"
          aria-labelledby="modal-title"
          noValidate
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
              aria-required="true"
            />
            {errors.name && (
              <div
                id="name-error"
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              aria-required="true"
            />
            {errors.email && (
              <div
                id="email-error"
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              메시지 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              {...register("message")}
              className={`w-full px-3 py-2 border rounded-md text-sm transition-colors  min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              aria-describedby={errors.message ? "message-error" : undefined}
              aria-invalid={!!errors.message}
              aria-required="true"
              rows={4}
            />
            {errors.message && (
              <div
                id="message-error"
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors.message.message}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "제출"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
