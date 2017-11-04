import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { Color } from "color";
import { View } from "ui/core/view";
import { AnimationCurve } from 'ui/enums';

import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user';

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;
    @ViewChild("container") container: ElementRef;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://bg_login';
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }
    login() {
        this.userService.login(this.user)
            .subscribe(
            () => this.router.navigate(["/list"]),
            (error) => alert("Unfortunately we could not find your account.")
            );
    }
    signUp() {
        this.userService.register(this.user)
            .subscribe(
            () => {
                alert("Your account was successfully created.");
                this.toggleDisplay();
            },
            () => alert("Unfortunately we were unable to create your account.")
            );
    }
    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
        let container = <View>this.container.nativeElement;
        container.animate({
            translate: { x: 0, y: -40},
            duration: 0
        });
        container.animate({
            translate: { x: 0, y: 0},
            duration: 300,
            curve: AnimationCurve.spring
        });
    }
}