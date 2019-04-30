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

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

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
    MatSliderModule, MatAutocompleteModule, MatStepperModule,MatExpansionModule,

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
        MatExpansionModule,
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
        NgZorroAntdModule,

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
        MatExpansionModule,
        NgZorroAntdModule,
        

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