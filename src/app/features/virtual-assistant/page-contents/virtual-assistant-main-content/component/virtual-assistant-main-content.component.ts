// ANGULAR CORE
import { Component, Input, OnInit } from '@angular/core';

// MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { BreakpointService } from 'src/app/services/shared/breakpoint/breakpoint.service';

// VIRTUAL-ASSISTANT MODELS - BUSINESS ASISSTANT CATEGORY
import { Category } from '../../../models/business-assistant.model';

// RESUME-DIALOG-COMPONENT
import { ResumeDialogComponent } from '../dialogs/resume-dialog/resume-dialog.component';

import { VIRTUAL_ASSISTANT_MAT_GRID_LIST } from 'src/app/shared/components/component-constants';


@Component({
  selector: 'virtual-assistant-page-main-content',
  templateUrl: './virtual-assistant-main-content.component.html',
  styleUrls: ['./virtual-assistant-main-content.component.scss']
})
export class VirtualAssistantMainContentComponent implements OnInit {

  // Responsive Breakpoint
  breakpoint: number | string | "Unknown";
  ratio: string | number;

  // Data Source to share with Mat-Accordion from VirtualAssistantAccordionComponent.
  @Input('inputDataMain') dataSourceCategory: Category[] = [];

  // Data Shared with VirtualAssistantListComponent.
  dataShared: any[] = [] // TODO improve typing any[]

  // Not delete this empty constructor to make implementations easier to understand.
  constructor(
    public dialog: MatDialog,
    private responsive: BreakpointService
  ) {
    const value = VIRTUAL_ASSISTANT_MAT_GRID_LIST.get(this.responsive.getCurrentScreenSize());
    if (value != undefined) {
      this.breakpoint = value[0];
      this.ratio = value[1];
    } else {
      this.breakpoint = 0;
      this.ratio = "150px";
    }
  }

  ngOnInit(): void {
    this.responsive.breakpoint$.subscribe((res) => {
      VIRTUAL_ASSISTANT_MAT_GRID_LIST.forEach((value, key) => {
        if (key == res) {
          this.breakpoint = value[0];
          this.ratio = value[1];
        }
      });
    });
  }


  /**
   * Get the output data from accordion-component.
   * @param accordionData The obtained data is shared by the component in the input of VirtualAssistantList.
   */
  getDataFromAccordion(accordionData: any[]) {  // TODO improve typing any[]
    this.dataShared = [...accordionData];
  }

  /**
   * Click on the resume button.
   * It needs to be a callback function (it will be used as a parameter).
   */
  onClickResumeButton = (): void => {
    this.dialog.open(ResumeDialogComponent, {
      // width: '500px', // sample use
      // height: '500px', // sample use
      data: this.dataShared
    });
  }

  /**
   * Click on the save button.
   * It needs to be a callback function (it will be used as a parameter).
   */
  onClickSaveButton = (): void => {
    // TODO implement onClickSaveButton
  }

}

