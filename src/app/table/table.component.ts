import { Component, OnInit } from "@angular/core";
import {
  ConfirmationService,
  DialogService,
  Message,
  MessageService,
} from "primeng/api";
import { CommonService } from "../common.service";
import { CustomerComponent } from "../customer/customer.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  providers: [DialogService, ConfirmationService],
})
export class TableComponent implements OnInit {
  dataCustomer: any;
  textsearch = "";
  dataById: any;
  msgs: Message[];

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  show(value) {
    const ref = this.dialogService.open(CustomerComponent, {
      header: "Customer Form",
      width: "30%",
      data:{
        dataEdit: value
      },
    });
    ref.onClose.subscribe(()=> {
      this.getAllCustomer();
    })
  }

  ngOnInit() {
    this.getAllCustomer();
  }

  handleSearch() {
    this.commonService.getCustomer(this.textsearch).subscribe({
      next: (res) => {
        this.dataCustomer = res;
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Internal Server Error",
        });
      },
    });
  }

  editCustomer(value) {
    this.commonService.getCustomerById(value.id).subscribe((res) => {
      this.dataById = res;
      this.show(res)
    });
  }

  getAllCustomer() {
    this.commonService.getCustomer(this.textsearch).subscribe({
      next: (res) => {
        this.dataCustomer = res;
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Internal Server Error",
        });
      },
    });
  }

  deleteCustomer(value) {
    this.confirmationService.confirm({
      message: "Do you want to delete this record?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.commonService.deleteCustomerApi(value).subscribe({
          next: (res) => {
            this.getAllCustomer();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: " Delete Success!",
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Internal Server Error",
            });
          },
        });
      },
      reject: () => {},
    });
  }
}
