import { test, expect, request, chromium } from '@playwright/test';
test('Compare UI and API CTA labels', async ({ page }) => {

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
//1. Select the first plan from the list of products 
  // Navigate to Vodafone SIM Only Plans page
  await page.goto('https://www.vodafone.com.au/mobile/sim-only-phone-plans');

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
 
//2.Click Add to Cart on the first plan
  //Selecting and adding the first plan to the cart
  const addToCartButtons = await page.locator('button:has-text("Add to cart")').nth(1);
  //const addToCartButtonFirstOpt = page.getByTestId('accordion-item-54');
  await addToCartButtons.click();
  await page.waitForTimeout(5000);

  console.log('Succesfully Add to Cart on the first plan.');
 

 //landing page after clicking add to cart
const reviewPageSummaryHeader = page.getByTestId('extras-mincart-title');
    await reviewPageSummaryHeader.isVisible();
    await expect(reviewPageSummaryHeader).toContainText('Review Summary');

//3. Assert Amount displayed on Sticky Cart
    const reviewPageStickyCart = page.getByTestId('sticky-cart-container');
    await expect(reviewPageStickyCart).toContainText('Prices may change in cart, if you have existing services.');

    const stickyCartAmount = page.getByTestId('sticky-cart-price-value-plan');// selector for the amount displayed on the sticky cart
    await expect(stickyCartAmount).toContainText('45.00/mth');

    console.log('Sticky cart amount verified successfully.');

//4.Continue to Cart
const continueToCartButton = page.getByTestId('sticky-cart-title-cta-button');
    await continueToCartButton.click();
    await page.waitForTimeout(5000);

const cartPageHeader = page.getByTestId('cart-summary-title');
    await cartPageHeader.isVisible();
    await expect(cartPageHeader).toContainText('Your cart');

console.log('Navigated to Cart page successfully.');
 
//5. Assert Plan added on Cart vs. Selected Plan
const showDetailsButton = await page.getByRole('button', { name: /Show details/i });
await showDetailsButton.click();
await page.waitForTimeout(2000); // wait for expansion

const smallPlanText = page.getByText('Small Plan').nth(0);
await expect(smallPlanText).toBeVisible();
await expect(smallPlanText).toContainText('Small Plan');


const sixtyGBText = page.getByText('First use 60GB').nth(0);
await expect(sixtyGBText).toBeVisible();
await expect(sixtyGBText).toContainText('First use 60GB');


console.log('Verified that the correct plan is added to the cart.');
   });