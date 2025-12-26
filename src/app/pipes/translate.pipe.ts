import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'translate',
    pure: false // Impure to update on language change automatically
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    private subscription: Subscription | undefined;

    constructor(private translationService: TranslationService, private ref: ChangeDetectorRef) {
        // In a "pure: false" pipe, we ideally don't need manual subscriptions if we just return value
        // based on service state. But to trigger change detection cleanly when service emits,
        // we can subscribe.
        // However, simplified approach: "pure: false" checks on check cycle. 
        // If the service's current lang changes, the pipe re-evaluates.
    }

    transform(key: string): string {
        return this.translationService.translate(key);
    }

    ngOnDestroy(): void {
        // Cleanup if needed
    }
}
