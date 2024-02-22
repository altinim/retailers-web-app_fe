import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const dateComparisonValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const startDate = control.get('StartDate')?.value
    const expiryDate = control.get('ExpiryDate')?.value

    console.log(
        'Validator Triggered - Start Date:',
        startDate,
        'Expiry Date:',
        expiryDate
    )

    if (startDate && expiryDate && startDate > expiryDate) {
        console.log(
            'Validation Error Detected: Expiry Date must be after Start Date'
        )
        return { dateComparison: 'Expiry Date must be after Start Date' }
    }

    console.log('Validation Passed')
    return null
}
