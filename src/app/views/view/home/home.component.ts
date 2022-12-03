import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { EffectFade, EffectFlip, SwiperOptions, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
//install swiper module
SwiperCore.use([EffectFlip])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: true,
    height: 90
  };
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  constructor() { }

  ngOnInit(): void {
  }
  onSwiper([swiper]: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
  slideNext() {
    this.swiper?.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev(100);
  }
}
