import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from "googlemaps";

@Component({
    selector: 'AutocompleteComponent',
    template: `
    <mat-form-field class="auto-place">
    <mat-icon matPrefix color="warn">place</mat-icon>
        <input matInput
        type="text"
        placeholder="Nhập địa chỉ: "
        [(ngModel)]="autocompleteInput"
        #addresstext
    >
    </mat-form-field>
      
    `,
    styles : [' .auto-place{ width : 100%}']
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    @Input() geocode: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'VN' },
                types: [this.adressType, this.geocode]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            const geocode = autocomplete.getBounds();
            this.invokeEvent(geocode);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

}
