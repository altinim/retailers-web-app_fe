import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { NotificationService } from 'src/Services/Globals/ToastrService'
import { UserService, User } from 'src/Services/User/user.service'

@Component({
    selector: 'app-company-table',
    templateUrl: './company-table.component.html',
    styleUrls: ['./company-table.component.css'],
})
export class CompanyTableComponent implements AfterViewInit {
    @Input() IsApproved!: boolean
    users: User[] = []
    displayedColumns: string[] = ['name', 'companyId', 'email', 'location']
    dataSource = new MatTableDataSource<User>()
    roles: string[] = ['Manager', 'Admin']
    @ViewChild(MatPaginator) paginator!: MatPaginator

    constructor(
        private _userService: UserService,
        private notificationService: NotificationService
    ) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
        this.loadUsers()
        this.IsApproved
            ? this.displayedColumns.push('role')
            : this.displayedColumns.push('isApproved')
    }
    public loadUsers(): void {
        const pageNumber = 1
        const pageSize = 100

        this._userService
            .getUsersWithPagination(pageNumber, pageSize, this.IsApproved)
            .subscribe({
                next: (data) => {
                    this.dataSource.data = data
                },
                error: (error) => {
                    throw new Error(error)
                },
                complete: () => {},
            })
    }
    onRoleSelected(user: User): void {
        if (user && user.id !== undefined) {
            user.selectionMade = true

            this._userService.saveUserRole(user.id, user.role).subscribe({
                next: (response) => {
                    console.log('Role saved successfully:', response)
                },
                error: (error) => {
                    console.error('Error saving role:', error)
                },
            })
        } else {
            console.error('Invalid userId:', user.id)
        }
    }

    approveUser(userId: number): void {
        this._userService.approveUser(userId).subscribe({
            next: (response) => {
                console.log(`User ${userId} approved successfully:`, response)
                this.loadUsers()
                this.notificationService.showSuccess('User Approved')
            },
            error: (error) => {
                console.error(`Error approving user ${userId}:`, error)
            },
        })
    }
}
