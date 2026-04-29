import { Injectable, signal } from '@angular/core';
import { ModalState } from '../ui-state/modal-state';
 
@Injectable({
  providedIn: 'root',
})
export class UserInterfaceService {

  modalState = signal<ModalState | null>(null);

  setModalState(modalState: ModalState | null) {
    this.modalState.set(modalState);
  }
}
