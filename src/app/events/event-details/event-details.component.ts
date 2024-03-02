import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  sub!: Subscription;
  quantitySub: Subscription = new Subscription();
  eventId: string;
  eventDetails: EventDetails;

  form: FormGroup;

  quantityValueMultiplied: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    this.sub = this.eventService
      .getEventDetails(this.eventId)
      .subscribe((eventDetails) => {
        this.eventDetails = eventDetails;
      });

    this.form = this.formBuilder.group({ quantity: [0, Validators.min(0)] });
  
      this.subscribeToQuantityValueChange();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.quantitySub.unsubscribe();
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

  private subscribeToQuantityValueChange() {
    this.quantitySub.add(
      this.form.get('quantity')?.valueChanges.subscribe((value) => {
        this.quantityValueMultiplied = value * this.eventDetails.price;
      })
    );
  }
}
