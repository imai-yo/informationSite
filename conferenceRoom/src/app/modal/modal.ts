import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() modalData: any;
  @Output() modalDisp: EventEmitter<boolean> = new EventEmitter();
  closeModal() {
    this.modalDisp.emit();
  }
}
