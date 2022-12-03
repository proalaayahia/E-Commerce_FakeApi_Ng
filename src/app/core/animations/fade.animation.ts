import { animate, style, transition, trigger } from "@angular/animations";

export const fadeAnimtion = trigger('fade', [
  transition('*<=>*', [
    style({ opacity: 0 }),
    animate('200ms', style({ opacity: 1 }))
  ])
])
