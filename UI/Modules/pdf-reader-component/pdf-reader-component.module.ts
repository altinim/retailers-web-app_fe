import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http' // Add this import
import { PdfReaderComponentComponent } from './pdf-reader-component/pdf-reader-component.component'

@NgModule({
    declarations: [PdfReaderComponentComponent],
    imports: [CommonModule, HttpClientModule], // Add HttpClientModule here
})
export class PdfReaderComponentModule {}
