import { Selector, t } from "testcafe";
import BaseClass from "../utilities/baseClass";

export class LogInPage extends BaseClass {
    constructor() {
        super();
        this.firstName = Selector('input[placeholder="e.g John"]');
        this.lastName = Selector('input[placeholder="e.g Doe"]');
        this.mobileNumber = Selector('input[placeholder="e.g 0123456789"]');
        this.whatsAppNumberOption = Selector(
            'ng-select[placeholder="Do you have a WhatsApp number?"]'
        );
        this.receiveNotificationsOption = Selector(
            'ng-select[placeholder="Select an option..."]'
        );
        this.email = Selector('input[placeholder="e.g example@gmail.com"]');
        this.location = Selector(
            'ng-select[placeholder="Type and select from suggested list"]'
        );
        this.hearAboutUsOption = Selector(
            'ng-select[placeholder="How did you hear about us?"]'
        );
        this.showPasswordButton = Selector("#button_addon2");
        this.inputPassword = Selector('input[name="password"]');
        this.registerButton = Selector('button[type="submit"]');
        this.welcomePopUp = Selector(".modal-content");
    }

    async fillInSignUpForm(
        firstName,
        lastName,
        mobileNumber,
        whatsAppNumberOption,
        receiveNotificationsOption,
        email,
        location,
        hearAboutUsOption
    ) {
        await t
            .typeText(this.firstName, firstName)
            .typeText(this.lastName, lastName)
            .typeText(this.mobileNumber, mobileNumber);
        await this.selectNgSelectOptionByText(
            this.whatsAppNumberOption,
            whatsAppNumberOption
        );
        await this.selectNgSelectOptionByText(
            this.receiveNotificationsOption,
            receiveNotificationsOption
        );
        await t
            .typeText(this.email, email)
            .typeText(this.location, "bellville pa")
        await this.selectNgSelectOptionByText(this.location, location);
        const password = await this.grabPassword();
        await t
            .typeText(this.inputPassword, password)
            .click(this.showPasswordButton);
        await this.selectNgSelectOptionByText(
            this.hearAboutUsOption,
            hearAboutUsOption
        );
        await t
            .wait(30000)
            .click(this.registerButton)
            .wait(5000)
            .expect(this.welcomePopUp.exists)
            .ok("Welcome to JobJack popup not found.");
        console.log("Successfully signed up!");
    }
}
