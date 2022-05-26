import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  actionBtn : string = "Save";
  personForm !: FormGroup;
  constructor(
    private formBuilder : FormBuilder, 
    private api : ApiService, 
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ){
      
    }
    
    ngOnInit(): void {
      this.personForm = this.formBuilder.group({
        firstName : ['',Validators.required],
        lastName: ['',Validators.required],
        age : ['',Validators.required],
        city : ['',Validators.required]
      });
      
      //display current on edit
      if(this.editData){
        this.actionBtn = "Update"
        this.personForm.controls['firstName'].setValue(this.editData.firstName)
        this.personForm.controls['lastName'].setValue(this.editData.lastName)
        this.personForm.controls['age'].setValue(this.editData.age)
        this.personForm.controls['city'].setValue(this.editData.city)
      }
    }
  ///////////////////////////////////////////////////////////////////////////////////////
    addPerson(){
      if(!this.editData){
        if(this.personForm.valid){
          this.api.postPerson(this.personForm.value)
          .subscribe({
            next:()=>{
              alert("Person added successfully")
              this.personForm.reset()
              this.dialogRef.close('save')},
            error:()=>{
              alert("Error while trying to add the person")
              }
            })
          }
        }
        else{
          this.updatePerson()
        }
      }

    updatePerson(){
      if(this.personForm.valid){
        this.api.putPerson(this.personForm.value, this.editData.id).subscribe({
          next:()=>{
            alert("Person updated successfully")
            this.personForm.reset()
            this.dialogRef.close('update')}, 
            error:()=>{
              alert("Error while trying to update the person")
            }
          })
        }
      }
    }
      
      