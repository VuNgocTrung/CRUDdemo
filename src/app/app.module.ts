import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ToastModule } from "primeng/toast";
import { AppComponent } from "./app.component";
import { CustomerComponent } from "./customer/customer.component";
import { TableComponent } from "./table/table.component";
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { MessageService } from "primeng/api";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";

@NgModule({
  declarations: [AppComponent, CustomerComponent, TableComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    DynamicDialogModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule
  ],
  entryComponents: [CustomerComponent],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
