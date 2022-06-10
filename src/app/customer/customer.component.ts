import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
  MessageService,
} from "primeng/api";
import { CommonService } from "../common.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  dataCustomer: any;
  titleCustomer: string;
  dataById: any;
  userNameDefault = "";
  phoneDefault = "";
  addessDefault = "";
  checkButton = false;
  id = "";
  usernamePattern = /^[a-zA-Z ]{6,32}$/i;
  phonePattern = /^[0-9\-]*$/;
  textsearch = "";

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService
  ) {
    if (this.config && this.config.data && this.config.data.dataEdit) {
      this.dataCustomer = JSON.parse(JSON.stringify(this.config.data.dataEdit));
      this.checkButton = true;
      this.userNameDefault = this.dataCustomer.username;
      this.phoneDefault = this.dataCustomer.phone;
      this.addessDefault = this.dataCustomer.address;
      this.id = this.dataCustomer.id;
      this.titleCustomer = 'Update Customer'
    } else {
      this.titleCustomer = 'Add New Customer'
    }
  }

  ngOnInit() {}

  addNewCustomer(value: NgForm) {
    for (const key in value.value) {
      if (typeof value.value[key] === "string") {
        value.value[key] = value.value[key].trim();
        if (value.value[key].length <= 0) {
          value.value[key] = null;
        }
      }
    }
    this.commonService.createCustomer(value.value).subscribe({
      next: (res) => {
        value.reset();
        this.userNameDefault = "";
        this.phoneDefault = "";
        this.addessDefault = "";
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: " Add New Success!",
        });
        this.ref.close();
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Success",
          detail: "Internal Server Error",
        });
      },
    });
  }

  updateCustomerForm(value) {
    for (const key in value.value) {
      if (typeof value.value[key] === "string") {
        value.value[key] = value.value[key].trim();
        if (value.value[key].length <= 0) {
          value.value[key] = null;
        }
      }
    }
    this.commonService
      .updateCustomer({ value: value.value, dataId: this.id })
      .subscribe({
        next: (res) => {
          value.reset();
          this.userNameDefault = "";
          this.phoneDefault = "";
          this.addessDefault = "";
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: " Update Success!",
          });
          this.ref.close();
          this.checkButton = false;
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
}
