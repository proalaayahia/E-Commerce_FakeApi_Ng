import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { DialogOverviewExampleDialog } from './dialogs/dialog-overview-example-dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  columns = [
    { columnDef: 'image', header: 'Image' },
    { columnDef: 'title', header: 'Title' },
    { columnDef: 'category', header: 'Category' },
    { columnDef: 'price', header: 'Price' },
    { columnDef: 'rating1', header: 'Rate' },
    { columnDef: 'rating2', header: 'Count' }
  ]
  products$: Observable<ProductModel[]>;
  subscribtion!: Subscription;
  constructor(private service: ProductService, public dialog: MatDialog) {
    this.products$ = this.service.getProducts()
    // Assign the data to the data source for the table to render
  }
  onTableAction(event: any) {
    console.log('event', event.value)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed ' + result);
    });
  }
}
