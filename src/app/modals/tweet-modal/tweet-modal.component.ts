import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tweet-modal-content',
  templateUrl: './tweet-modal.content.html'
})
export class TweetModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'tweet-modal',
  templateUrl: './tweet-modal.component.html'
})
export class TweetModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(TweetModalContent);
    modalRef.componentInstance.name = 'World';
  }
}