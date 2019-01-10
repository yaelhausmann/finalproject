import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Product } from '@app/_models';
import { UserService, AuthenticationService,ProductService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    AllProducts : any;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private ProductService: ProductService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
   
        });
    }

    ngOnInit() {
        this.loadAllProduct();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: string) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllProduct()
        });
    }

    // private loadAllUsers() {
    //     this.userService.getAll().pipe(first()).subscribe(users => {
    //         console.log(JSON.stringify(users))
            
    //     });
    // }
    private loadAllProduct() {
        this.ProductService.getAll().pipe(first()).subscribe(products => {
            let AllProducts :any = products
            this.AllProducts = AllProducts.products

        });
    }
}