import puppeteer from "puppeteer";

// Function to log in to Facebook
async function loginToFacebook(page) {
  const email = 'omarilpa09@gmail.com'; // Replace with your Facebook email
  const password = 'Amor.2009'; // Replace with your Facebook password

  await page.goto('https://www.facebook.com');
  await page.waitForSelector('#email');
  await page.waitForSelector('#pass');
  await page.type('#email', email, { delay: 100 });
  await page.type('#pass', password, { delay: 100 });
  await Promise.all([
    page.click('button[name="login"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  console.log('Logged in successfully');
}

// Function to search for Facebook posts that contain a specific propertyId
async function getFacebookImages(page, propertyId) {
  console.log(`Searching for posts related to propertyId: ${propertyId}`);
  await page.goto('https://www.facebook.com/AltamayozforRealEstateInvestment'); // Replace with the Facebook page URL

  // Wait for some posts to load
  try {
    await page.waitForSelector('div[data-testid="post"]', { timeout: 20000 });
  } catch (error) {
    console.log('Error waiting for posts:', error);
    return [];
  }

  // Scroll multiple times to load more posts
  for (let i = 0; i < 3; i++) { // Scroll 3 times
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(5000); // Wait 5 seconds for more posts to load
  }

  // Search for posts with propertyId
  const images = await page.evaluate((propertyId) => {
    const posts = Array.from(document.querySelectorAll('div[data-testid="post"]'));
    const foundImages = [];

    posts.forEach(post => {
      const text = post.innerText;
      if (text && text.includes(propertyId)) {
        const imgElements = post.querySelectorAll('img');
        imgElements.forEach(img => {
          if (img.src) {
            foundImages.push(img.src);
          }
        });
      }
    });

    return foundImages;
  }, propertyId);

  if (images.length > 0) {
    console.log(`Found ${images.length} images for propertyId: ${propertyId}`);
  } else {
    console.log('No images found.');
  }

  return images;
}

// Function to log page content for debugging purposes
async function logPageContent(page) {
  const content = await page.content();
  console.log('Page content:', content); // This will print the entire HTML content of the page
}

// Function to execute the scraping process
async function testScraping() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Log in to Facebook
  await loginToFacebook(page);

  // Log the page content to see if posts are present
  await logPageContent(page);

  // Use a dummy propertyId for testing
  const testPropertyId = 'TMZ8019'; // You can change this ID to a test value

  // Get images for the test propertyId
  const images = await getFacebookImages(page, testPropertyId);
  console.log('Images found:', images);

  // You can further inspect the images if needed
  if (images.length > 0) {
    console.log('Images:', images);
  }

  await browser.close();
}

// Execute the test scraping
testScraping().catch(console.error);
