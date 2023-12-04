import { Selector, t } from 'testcafe';

const findAJob = Selector('.btn.btn-jj-1.ms-0.ms-lg-4.ms-lg-auto.mx-xxl-1.jj-bg-green');
const regAccBanner = Selector('.text-center.text-lighter.fw-normal.mt-3.mb-3');
const firstName = Selector('input[placeholder="e.g John"]');
const lastName = Selector('input[placeholder="e.g Doe"]');
const mobileNumber = Selector('input[placeholder="e.g 0123456789"]');
const whatsAppNumberOption = Selector('ng-select[placeholder="Do you have a WhatsApp number?"]');
const receiveNotificationsOption = Selector('ng-select[placeholder="Select an option..."]');
const email = Selector('input[placeholder="e.g example@gmail.com"]');
const location = Selector('ng-select[placeholder="Type and select from suggested list"]');
const hearAboutUsOption = Selector('ng-select[placeholder="How did you hear about us?"]');
const showPasswordButton = Selector('#button_addon2');
const inputPassword = Selector('input[name="password"]');
const registerButton = Selector('button[type="submit"]');
const welcomePopUp = Selector('.modal-content');

async grabPassword() {
    const regAccBannerText = await this.regAccBanner.innerText;
    const grabbedPassword = String(regAccBannerText).slice(0, 8);
    return grabbedPassword
}



async function selectNgSelectOptionByText(locator, text) {
    const ngSelect = Selector(locator);
    const optionLocator = '.ng-option';

    try {
        await t.click(ngSelect);
        await t.expect(ngSelect.exists).ok();

        //Waiting for options to become visible
        await t.wait(2000);
        await t.expect(Selector(optionLocator).visible).ok();

        //Finding desired option
        const desiredOption = await Selector(optionLocator)
            .find('span.ng-option-label')
            .withText(text);

        console.log('Desired Option Exists in Dropdown:', await desiredOption.exists);

        if (await desiredOption.exists) {
            console.log('Desired Option Inner Text:', await desiredOption.innerText);
            await t.scrollIntoView(desiredOption);
            console.log('Clicking on desired option');
            await t.click(desiredOption);
            await t.wait(500);
        } else {
            console.log(`Text ${text} not found in ng-select options`);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

fixture('/test')
    .page('https://jobjack.co.za');

test('Simulation1', async t => {
    await t
        .maximizeWindow()
        .click(findAJob)
        .expect(regAccBanner.exists).ok('Registration Account Banner is not visible.')
        .typeText(firstName, 'Job')
        .typeText(lastName, 'Jack')
        .typeText(mobileNumber, '123456789');
    await selectNgSelectOptionByText(whatsAppNumberOption, 'Same as mobile number');
    await selectNgSelectOptionByText(receiveNotificationsOption, 'Yes');
    await t
        .typeText(email, 'qa.assessment@gmail.com')
        .typeText(location, 'bellville pa');
    await selectNgSelectOptionByText(location, 'Bellville Park, Cape Town, Western Cape, South Africa');
    const password = await grabPassword();
    await t
        .typeText(inputPassword, password)
        .click(showPasswordButton);
    await selectNgSelectOptionByText(hearAboutUsOption, 'Radio');
    await t
        //.wait(10000)
        .click(registerButton)
        .wait(3000)
        .expect(welcomePopUp.exists).ok('Welcome to JobJack popup not found');
        console.log('Successfully signed up!')
});


