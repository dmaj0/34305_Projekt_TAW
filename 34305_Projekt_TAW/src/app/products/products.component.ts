import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: Product[] = [];
  isDetailsOpen: boolean = false;
  selectedProduct: any = null;
  isEditOpen: boolean = false;
  editedProduct: any = null;
  editForm: FormGroup;
  isAddOpen: boolean = false;
  addForm: FormGroup;

  constructor(private productsService: ProductsService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required]
    });
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onAddNew(): void {
    this.isAddOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeAdd(): void {
    this.isAddOpen = false;
    this.addForm.reset();
    document.body.style.overflow = 'auto';
  }

  onSubmitAddForm(): void {
    if (this.addForm.valid) {
      this.addProduct(this.addForm.value);
    }
  }

  addProduct(newProduct: Product): void {
    this.productsService.addProduct(newProduct).subscribe((response) => {
      const product = response.product;
      this.products.push({
        id: product._id,
        title: product.title,
        image: product.image,
        description: product.description,
        author: product.author
      });
      this.closeAdd();
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(response => {
      this.products = response.products.map((product: any) => ({
        id: product._id,
        title: product.title,
        image: product.image,
        description: product.description,
        author: product.author
      }));
    }, error => {
      console.log(error);
    });
  }

  onDelete(id: string): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    }, error => {
      console.log(error);
    });
  }

  onDetails(productId: string): void {
    this.selectedProduct = this.products.find(product => product.id === productId);
    this.isDetailsOpen = true;
    document.body.style.overflow = 'hidden'; 
  }

  closeDetails(): void {
    this.isDetailsOpen = false;
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  onEdit(productId: string): void {
    this.editedProduct = this.products.find(product => product.id === productId);
    this.isEditOpen = true;
    document.body.style.overflow = 'hidden';
    this.editForm = this.formBuilder.group({
      title: [this.editedProduct.title, Validators.required],
      image: [this.editedProduct.image, Validators.required],
      description: [this.editedProduct.description, Validators.required],
      author: [this.editedProduct.author, Validators.required]
    });
  }

  closeEdit(): void {
    this.isEditOpen = false;
    this.editedProduct = null;
    document.body.style.overflow = 'auto';
  }

  onSubmitEditForm(): void {
    if (this.editForm.valid) {
      this.editedProduct = Object.assign(this.editedProduct, this.editForm.value);
      this.updateProduct();
    }
  }

  updateProduct(): void {
    this.productsService.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(() => {
      this.products = this.products.map(product => {
        return product.id === this.editedProduct.id ? this.editedProduct : product;
      });
      this.closeEdit();
    }, error => {
      console.log(error);
    });
  }
}
