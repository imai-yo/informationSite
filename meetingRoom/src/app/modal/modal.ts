import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  standalone: true,
})
export class Modal {
  form: FormGroup;

  @Input() set setModalData(modalData: any) {
    this.form.patchValue(modalData);
  }
  @Output() modalDisp: EventEmitter<boolean> = new EventEmitter();
  @Output() reserve: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      reservationId: [''],
      roomId: [''],
      roomName: [''],
      meetingName: [''],
      reserver: [''],
      date: [''],
      start_time: [''],
      end_time: [''],
    });
  }

  onCancel() {
    this.modalDisp.emit();
  }

  onReserve() {
    this.reserve.emit(this.form.value);
    this.modalDisp.emit();
  }

  onDelete() {
    this.delete.emit(this.form.value.reservationId);
  }
}
