import { Selector, t } from "testcafe";

export default class BaseClass {
    constructor() {
        this.optionLocator = ".ng-option";
        this.regAccBanner = Selector(
            ".text-center.text-lighter.fw-normal.mt-3.mb-3"
        );
    }

    async grabPassword() {
        const regAccBannerText = await this.regAccBanner.innerText;
        const grabbedPassword = String(regAccBannerText).slice(0, 8);
        return grabbedPassword;
    }

    async selectNgSelectOptionByText(locator, text) {
        const ngSelect = Selector(locator);

        try {
            await t.click(ngSelect);
            await t.expect(ngSelect.exists).ok();

            //Waiting for options to become visible
            await t.wait(2000);
            await t.expect(Selector(this.optionLocator).visible).ok();

            //Finding desired option
            const desiredOption = await Selector(this.optionLocator)
                .find("span.ng-option-label")
                .withText(text);

            console.log(
                "Desired Option Exists in Dropdown:",
                await desiredOption.exists
            );

            if (await desiredOption.exists) {
                console.log(
                    "Desired Option Inner Text:",
                    await desiredOption.innerText
                );
                await t.scrollIntoView(desiredOption);
                console.log("Clicking on desired option");
                await t.click(desiredOption);
                await t.wait(500);
            } else {
                console.log(`Text ${text} not found in ng-select options`);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}
