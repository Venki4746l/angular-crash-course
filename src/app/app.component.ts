import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  name: string;
  status: string;
  age: number;
}

const info = {
  users: [
    { name: 'venki', status: 'active', age: 23 },
    { name: 'varun', status: 'inactive', age: 56 },
    { name: 'teja', status: 'active', age: 30 },
    { name: 'raju', status: 'inactive', age: 10 },
    { name: 'bhaskar', status: 'active', age: 50 },
    { name: 'rajesh', status: 'inactive', age: 34 },
  ] as User[], // Specify the type for the 'users' array
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  filteredUsers$?: Observable<any>;

  constructor() {}

  ngOnInit(): void {
    this.filteredUsers$ = new Observable((data: Observer<any>) => {
      data.next(info);
      data.complete();
    }).pipe(
      map((data) => {
        const activeUsers = data.users.filter((user: User) => user.status === 'active');
        const activeUsersAbove18 = activeUsers.filter((user: User) => user.age > 18);

        // Calculate the average age of active users above 18
        const totalAge = activeUsersAbove18.reduce((sum:number, user:any) => sum + user.age, 0);
        const averageAge = totalAge / activeUsersAbove18.length;

        return { activeUsersAbove18, averageAge };
      })
    );

    this.filteredUsers$.subscribe({
      next: (data: any) => {
        console.log('Active Users Above 18:', data.activeUsersAbove18);
        console.log('Average Age of Active Users Above 18:', data.averageAge);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
