import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();
  addBenifiaryForm: benifiaryForm = new benifiaryForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  @ViewChild("benifiaryForm")
  benifiaryForm!: NgForm;
  isSubmitted: boolean = false;
  selectedFile: ImageSnippet;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {  }

  ProcessFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  AddEmployee(isValid: any) {
    this.isSubmitted = true;
    this.addEmployeeForm.photo=this.selectedFile.src
    console.log(this.addEmployeeForm)
    if (isValid) {
      this.httpProvider.saveEmployee(this.addEmployeeForm, this.addBenifiaryForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class employeeForm {
  name: string = "";
  job_position: string = "";
  salary: string = "";
  status: string = "";
  date_hire: string = "";
  photo: any;
}

export class benifiaryForm {
  name: string = "";
  relationship: string = "";
  date_born: string = "";
  gender: string = "";
  employed_id: string="";
}
