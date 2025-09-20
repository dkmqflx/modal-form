type ModalInstance<T> = {
  resolve: (value: T | null) => void;
  reject: (error: Error) => void;
};

export class ModalService<T> {
  private isModalOpen = false;
  private listeners: Set<(isOpen: boolean) => void> = new Set();
  private currentModal: ModalInstance<T> | null = null;

  subscribe(listener: (isOpen: boolean) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      listener(this.isModalOpen);
    });
  }

  openModal(): Promise<T | null> {
    if (this.currentModal) {
      this.currentModal.reject(new Error("Another modal is already open"));
    }

    return new Promise<T | null>((resolve, reject) => {
      this.currentModal = { resolve, reject };
      this.isModalOpen = true;
      this.notifyListeners();
    });
  }

  closeModal(result: T | null = null) {
    if (this.currentModal) {
      this.currentModal.resolve(result);
      this.currentModal = null;
    }

    this.isModalOpen = false;
    this.notifyListeners();
  }

  isOpen(): boolean {
    return this.isModalOpen;
  }
}
