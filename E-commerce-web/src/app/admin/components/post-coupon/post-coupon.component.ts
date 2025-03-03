import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
  couponForm!: FormGroup;
  categories:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar:MatSnackBar,
    private adminService: AdminService
  ){}

  ngOnInit(){
    this.couponForm = this.fb.group({
      name: [null,[Validators.required]],
      code: [null,[Validators.required]],
      discount: [null,[Validators.required]],
      expirationDate: [null,[Validators.required,this.dateNotInPast]],
      categoryId:[null,[Validators.required]]
    })  
    this.getCategories()
  }

  dateNotInPast(control: any) {
    if (!control.value) return null; // If no value, validation passes
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to 00:00:00 for accurate comparison

    // Return error if the selected date is in the past
    return selectedDate < today ? { pastDate: true } : null;
  }

  addCoupon(){
    console.log('coupon',this.couponForm.value)
    if(this.couponForm.valid){
      this.adminService.addCoupon(this.couponForm.value).subscribe(res=>{
        if(res.id != null){
          this.snackBar.open('Coupon Posted Successfully !','Close',{
            duration:5000
          });
          // this.router.navigateByUrl('admin/dashboard');
        }else{
          this.snackBar.open(res.message,'Close',{
            duration:5000,
            panelClass:'error-snackbar'
          });
        }
      })
    }else{
      this.couponForm.markAllAsTouched();
    }
  }

  getCategories(){
    this.adminService.getAllCategories().subscribe(res => {
      console.log("CATEGORIES",res)
      this.categories=res;
    })
  }

}
