import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedSection: string = '';
  modalVisible: boolean = false;
  currentLang: string = 'es';

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  openModal(section: string) {
    this.selectedSection = section;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.selectedSection = '';
  }

  switchLanguage(lang: string) {
    this.translationService.use(lang);
  }
}
