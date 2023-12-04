import { Selector, t } from "testcafe";
import { LogInPage } from "./LogInPage";
import BaseClass from "../utilities/baseClass";

export class HomePage extends BaseClass {
    constructor() {
        super();
        this.findAJobButton = Selector(
            ".btn.btn-jj-1.ms-0.ms-lg-4.ms-lg-auto.mx-xxl-1.jj-bg-green"
        );
    }

    async goToLogInPage() {
        await t
            .click(this.findAJobButton)
            .expect(this.regAccBanner.exists)
            .ok("Registration Account Banner is not visible.");

        console.log("Navigation to logInPage confirmed.");
        return new LogInPage();
    }
}
