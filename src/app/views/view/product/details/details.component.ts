import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [VoiceRecognitionService]
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: any
  product: any = {}
  isLoading: boolean = false
  subscriping!: Subscription
  text!: string;
  constructor(private activeRoute: ActivatedRoute, private service: ProductService, public voiceService: VoiceRecognitionService) {
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    this.voiceService.init();
  }

  ngOnInit(): void {
    this.getPoductDetails(this.id)
  }
  getPoductDetails(ID: number) {
    this.isLoading = true
    this.subscriping = this.service.getProductById(ID).subscribe((res) => {
      this.product = res
      this.isLoading = false
    })
  }
  ngOnDestroy(): void {
    this.subscriping.unsubscribe()
  }

  startService() {
    this.voiceService.start()
  }

  stopService() {
    this.voiceService.stop()
  }
}
