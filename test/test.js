import { HomePage } from "../pageObjects/homePage";

fixture("/test").page("https://hannahs-upskilling.netlify.app/");

class TestClass {
    async testQASimulation1() {
        await test("Example Test", async (t) => {
            await t.maximizeWindow();

            const homePage = new HomePage();
            const login = await homePage.goToLogInPage();
            await login.fillInSignUpForm(
                "Job",
                "Jack",
                "0123456789",
                "Same as mobile number",
                "Yes",
                "qa.1assessment@gmail.com",
                "Bellville Park, Cape Town, Western Cape, South Africa",
                "Radio"
            );
        });
    }
}

const testClassInstance = new TestClass();
testClassInstance.testQASimulation1();
