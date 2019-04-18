import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CovalentHttpModule } from '@covalent/http';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NotifierModule } from 'angular-notifier';
import {
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentSearchModule,
    CovalentCommonModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    

} from '@covalent/core';

import { CovalentDialogsModule} from '@covalent/core/dialogs';
import { CovalentLoadingModule} from '@covalent/core/loading';
import { TdDialogService} from '@covalent/core/dialogs';
import { TdLoadingService} from '@covalent/core/loading';

import {

} from '@angular/material';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatListModule,
    MatSelectModule, MatSlideToggleModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,
    MatSidenavModule, MatButtonToggleModule, MatSnackBarModule,
    MatTabsModule, MatTooltipModule, MatRippleModule, MatGridListModule,
    MatSliderModule, MatAutocompleteModule, MatStepperModule,

} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        /** Material Modules */
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,
        MatGridListModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatStepperModule,
        MaterialFileInputModule,
        /** Covalent Modules */
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentHttpModule.forRoot(),
        CovalentDynamicFormsModule,
        CovalentSearchModule,
        CovalentDialogsModule,
        CovalentLoadingModule,
        CovalentCommonModule,
        CovalentMediaModule,
        CovalentExpansionPanelModule,
        CovalentPagingModule,
        CovalentNotificationsModule,
        CovalentMenuModule,
        CovalentDataTableModule,
        CovalentMessageModule,

        NotifierModule,

        RouterModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatListModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSidenavModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,
        MatGridListModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatStepperModule,
        MaterialFileInputModule,
        

        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentDynamicFormsModule,
        RouterModule,
        CovalentDialogsModule,
        CovalentSearchModule,
        CovalentLoadingModule,
        CovalentCommonModule,
        CovalentMediaModule,
        CovalentExpansionPanelModule,
        CovalentPagingModule,
        CovalentNotificationsModule,
        CovalentMenuModule,
        CovalentDataTableModule,
        CovalentMessageModule,

        NotifierModule,
    ],
    providers: [
        //   TdDialogService,
        // TdLoadingService,
    ]
})
export class CommonModuleUi { }