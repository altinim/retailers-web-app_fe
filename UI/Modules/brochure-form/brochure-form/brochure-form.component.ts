import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NotificationService } from 'src/Services/Globals/ToastrService'
import { Router } from '@angular/router'
import {
    BrochureService,
    Brochure,
} from 'src/Services/Globals/brochure.service'
import { CompanyService } from 'src/Services/Globals/company.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
    selector: 'app-brochure-form',
    templateUrl: './brochure-form.component.html',
    styleUrls: ['./brochure-form.component.css'],
})
export class BrochureFormComponent {
    submitted: boolean = false
    brochureForm: FormGroup
    File: FormControl<string | null>
    file_store!: FileList
    branchAddresses: any[] = []
    selectedBranch: any

    constructor(
        private fb: FormBuilder,
        private notification: NotificationService,
        private router: Router,
        private brochureService: BrochureService,
        private companyService: CompanyService
    ) {
        this.brochureForm = this.fb.group({
            Title: ['', Validators.required],
            StartDate: ['', Validators.required],
            ExpiryDate: ['', Validators.required],
            File: ['', Validators.required],
            AddressId: ['', Validators.required],
        })

        this.File = new FormControl('', Validators.required)
    }

    setSelectedBranch(branch: any) {
        this.selectedBranch = branch
    }

    ngOnInit() {
        this.companyService.getAddressesByCompany().subscribe(
            (addresses) => {
                this.branchAddresses = addresses
            },
            (error) => {
                console.error('Error getting addresses:', error)
            }
        )
    }

    handleFileInputChange(files: FileList | null): void {
        if (files && files.length) {
            const file = files[0]
            const count = files.length > 1 ? `(+${files.length - 1} files)` : ''
            this.File.patchValue(`${file.name}${count}`)
            this.file_store = files
            this.brochureForm.get('File')?.setValue(file)
        } else {
            this.File.patchValue('')
            this.file_store = new DataTransfer().files
        }
    }

    compareDates(): boolean {
        const startDate = this.brochureForm.get('StartDate')?.value
        const expiryDate = this.brochureForm.get('ExpiryDate')?.value

        if (startDate && expiryDate && startDate >= expiryDate) {
            this.brochureForm
                .get('ExpiryDate')
                ?.setErrors({ dateComparison: true })
            return false
        }

        return true
    }

    submitData(): void {
        if (this.brochureForm.valid && this.compareDates()) {
            const { File, ...formDataWithoutFile } = this.brochureForm.value
            console.log('Form Data:', { ...formDataWithoutFile, File })
            const formData = new FormData()
            formData.append('Title', formDataWithoutFile.Title)
            formData.append(
                'StartDate',
                formDataWithoutFile.StartDate.toISOString()
            )
            formData.append(
                'ExpiryDate',
                formDataWithoutFile.ExpiryDate.toISOString()
            )
            formData.append('File', File, File.name)
            formData.append('AddressId', this.selectedBranch)
            this.brochureService.createBrochure(formData).subscribe(
                (response) => {
                    this.notification.showSuccess('The brochure has been saved')
                    this.router.navigate([''])
                },
                (error: HttpErrorResponse) => {
                    this.notification.showError(error.error)
                    console.log(error)
                }
            )
        } else {
            this.notification.showError('Please enter valid data')
        }
    }
}
