import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { localeEs } from '../i18n/es';
import { localeEn } from '../i18n/en';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private currentLangSubject = new BehaviorSubject<string>('es');
    public currentLang$ = this.currentLangSubject.asObservable();

    private translations: any = {
        es: localeEs,
        en: localeEn
    };

    public get currentLangValue(): string {
        return this.currentLangSubject.value;
    }

    constructor() { }

    use(lang: string): void {
        if (this.translations[lang]) {
            this.currentLangSubject.next(lang);
        }
    }

    translate(key: string): string {
        const lang = this.currentLangSubject.value;
        const keys = key.split('.');
        let value = this.translations[lang];

        for (const k of keys) {
            if (value) {
                value = value[k];
            } else {
                return key; // Return key if translation missing
            }
        }

        return value || key;
    }

    // Method to get the current translation object (useful for components)
    getCurrentTranslations(): any {
        return this.translations[this.currentLangSubject.value];
    }
}
