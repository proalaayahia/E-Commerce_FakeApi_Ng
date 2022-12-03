import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const showAnimation = trigger("show", [
  transition(":enter", [style({ opacity: 0, transform: 'translateY(-30px)' }), animate('500ms', style({ opacity: 1, transform: 'translateX(0)' }))]),
  transition(":leave", [animate('500ms', style({ opacity: 0, transform: 'translateY(-30px)' }))]),
])