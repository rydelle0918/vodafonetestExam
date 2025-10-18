import { test, expect, request, chromium } from '@playwright/test';
import axios from 'axios';


test('Compare UI and API CTA labels', async ({ page }) => {

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  //1. Navigate to Vodafone SIM Only Plans page
  await page.goto('https://www.vodafone.com.au/mobile/sim-only-phone-plans');

  //2. Getting the Product List

//a. Small Plan First Product
  const smallPlanName = page.getByTestId('plan-card-title-AU12749').nth(1);
  await expect(smallPlanName).toContainText('Small Plan');
  await expect(smallPlanName).toContainText('No excess data chargesFirst use 60GB, then keep using data in Oz at slower speeds.');

//b. Medium Plan Second Product
  const mediumPlanName = page.getByTestId('plan-card-title-AU12750').nth(1);
  await expect(mediumPlanName).toContainText('Medium Plan');
  await expect(mediumPlanName).toContainText('Medium PlanNo excess data chargesFirst use 200GB, then keep using data in Oz at slower speeds.');

//c. Large Plan Third Product
  const largePlanName = page.getByTestId('plan-card-title-AU12751').nth(1);
  await expect(largePlanName).toContainText('Large Plan');
  await expect(largePlanName).toContainText('No excess data chargesFirst use 400GB, then keep using data in Oz at slower speeds.');

console.log('Product names and descriptions verified successfully.'); 
  
  //3. Get all "Add to cart" buttons
  //const addToCartButtons = await page.locator('button:has-text("Add to cart")').nth(1);
  //const addToCartButtonFirstOpt = page.getByTestId('accordion-item-54');
   //await addToCartButtons.click();

 const addToCartButtons = await page.$$eval('button', buttons =>
  buttons //this grabs all buttons on the page
    .filter(btn => btn.textContent?.toLowerCase().includes('add to cart')) //filter to only "Add to cart" buttons
    .map(btn => btn.textContent?.trim()) //map to get text label of each matching button
);

console.log("Verified all Add to cart buttons", addToCartButtons);

  //4. Fetching data from Vodafone API

interface Plan {
  cta?: {
    label?: string;
  };
}

interface VodafoneResponse {
  plans: Plan[];
}

const response = await axios.get('https://api-prod.prod.cms.df.services.vodafone.com.au/plan/postpaid-simo?serviceType=New');

console.log('Full API response:', JSON.stringify(response.data, null, 2));

const plans = response.data?.data?.plans ?? [];

if (!Array.isArray(plans)) {
  console.warn(' Plans array not found in API response.');
  return;
}

//5.Verfied and obtained CTA labels
const apiLabels = plans.map((plan, index) => plan.cta?.label || `Plan ${index + 1}: No label`);
console.log('API CTA Labels:', apiLabels);

  //6. Compare UI and API labels
  apiLabels.forEach((label, index) => {
  const uiLabel = addToCartButtons[index];
  console.log(`Comparing UI label "${uiLabel}" with API label "${label}"`);
  expect(uiLabel).toContain(label);
});

});