import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;
  selectedFile: ImageSnippet;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }
  getEmployeeDetailById() {
    this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editEmployeeForm.id = resultData.id;
          this.editEmployeeForm.name = resultData.name;
          this.editEmployeeForm.job_position = resultData.job_position;
          this.editEmployeeForm.salary = resultData.salary;
          this.editEmployeeForm.status = resultData.status;
          this.editEmployeeForm.date_hire = resultData.date_hire;
          this.editEmployeeForm.photo = resultData.photo;
        }
      }
    },
      (error: any) => { });
  }

  UpdateEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      if (this.selectedFile)
        this.editEmployeeForm.photo=this.selectedFile.src
      this.httpProvider.updateEmployee(this.editEmployeeForm, this.editEmployeeForm.id).subscribe(async data => {
        console.log(data)
        if (data != null && data.body != null) {
          if (data.status == 200) {
              this.toastr.success(data.statusText);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
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

  ProcessFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

}

export class employeeForm {
  id: string = "";
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
