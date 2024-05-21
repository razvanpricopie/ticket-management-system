import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event.model';
import { CartService } from 'src/app/core/services/cart.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  form: FormGroup;

  eventId: string;
  eventDetails: EventDetails;

  quantitySub: Subscription = new Subscription();
  quantityValueMultiplied: number = 0;

  imageUrl: SafeUrl;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private cartService: CartService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.formBuilder.group({ quantity: [0, Validators.min(0)] });

    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addTickets() {
    if (this.form.valid) {
      const submittedQuantity = this.form.value.quantity;
      this.cartService.increaseQuantityToCart(
        this.eventDetails,
        submittedQuantity
      );
      this.form.setValue({ quantity: 0 });
    }
  }

  private initSubscriptions() {
    this.subscriptions.push(
      this.eventService
        .getEventDetails(this.eventId)
        .subscribe((eventDetails) => {
          this.eventDetails = eventDetails;
          this.initEventImage();
          this.loading = false;
        })
    );

    this.subscriptions.push(
      this.form.get('quantity')?.valueChanges.subscribe((value) => {
        this.quantityValueMultiplied = value * this.eventDetails.price;
      }) || new Subscription()
    );
  }

  private initEventImage() {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${this.eventDetails.image}`
    );
  }
}
