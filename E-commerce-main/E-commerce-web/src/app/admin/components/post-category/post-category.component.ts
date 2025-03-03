import { Component, } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {

  categoryForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar,
    private adminService:AdminService
  ){}

  ngOnInit():void{
    this.categoryForm = this.fb.group(
      {
        name: [null,[Validators.required]],
        description: [null,[Validators.required]],
      }
    )
    this.fetchCategories();
  }

  addCategory():void{
    if(this.categoryForm.valid){
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (res)=>{
          if(res.id!=null){
            this.snackBar.open('category created!','close',{duration:5000});
            // this.router.navigateByUrl('admin/dashboard');
            this.fetchCategories();
          }else{
            this.snackBar.open(res.message,'close',{duration:5000,panelClass: 'error-snackbar'});
          }
        }
      )
    }else{
       this.categoryForm.markAllAsTouched();
    }
  }

  fetchCategories(): void {
    this.adminService.getAllCategories().subscribe(res=>{
      this.categories = res;
    })
  }


}
