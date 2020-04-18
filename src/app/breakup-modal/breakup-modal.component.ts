import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breakup-modal',
  templateUrl: './breakup-modal.component.html',
  styleUrls: ['./breakup-modal.component.scss']
})
export class breakupModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.closeModal.emit("close");
  }
}
