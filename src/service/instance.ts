import { ModalService } from "./class";
import type { FormData } from "../model/schema";

export const formModalService = new ModalService<FormData>();

export const openFormModal = (): Promise<FormData | null> => {
  return formModalService.openModal();
};

export const closeFormModal = (result: FormData | null = null) => {
  formModalService.closeModal(result);
};

export const subscribeFormModal = (listener: (isOpen: boolean) => void) => {
  return formModalService.subscribe(listener);
};
