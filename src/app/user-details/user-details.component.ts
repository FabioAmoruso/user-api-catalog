import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]));
    console.log(this.user);
    
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   console.log('user id: ', params.get('id')!);
    //   this.userService.getUserById(params.get('id')!).subscribe((response: any) => {
    //     console.log(response);
    //     this.response = response;
    //   })
    // });
  }

  changeMode(mode: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
    if (mode === 'edit') {
      // Logic to update the user on the back end
      console.log('Updating user on the back end');
    }
  }

}
