import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedSection: string = '';  
  modalVisible: boolean = false;

  openModal(section: string) {
    this.selectedSection = section;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.selectedSection = ''; 
  }
}
