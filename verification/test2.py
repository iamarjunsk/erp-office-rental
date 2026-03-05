from playwright.sync_api import sync_playwright
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to login page...")
        page.goto("http://localhost:3000/login")

        print("Clicking login as admin...")
        page.click("text=Login as Admin")

        print("Waiting for dashboard navigation...")
        page.wait_for_url("**/admin*")

        print("Navigating to property creation...")
        page.goto("http://localhost:3000/admin/properties/create")

        print("Waiting for form elements to load...")
        page.wait_for_selector("input[placeholder='PROP-001']")

        print("Filling out the form...")
        # Since the labels don't have standard 'for' attributes linking them to inputs,
        # we'll use placeholder or other input attributes.
        page.fill("input[placeholder='PROP-001']", "PROP-999")
        page.fill("input[placeholder='Cyber Towers']", "Test Property")
        page.select_option("select", "commercial")
        page.fill("input[placeholder='50000']", "10000")
        page.fill("input[placeholder='Full address']", "123 Test St")
        page.fill("input[placeholder='Hyderabad']", "Test City")
        page.fill("input[placeholder='Telangana']", "Test State")
        page.fill("input[placeholder='500081']", "123456")

        print("Mocking API response...")
        page.route("**/api/properties/", lambda route: route.fulfill(
            status=400,
            json={"code": ["This field must be unique."]}
        ))

        print("Submitting the form...")
        page.click("button:has-text('Create Property')")

        print("Waiting...")
        time.sleep(1)

        print("Taking screenshot...")
        page.screenshot(path="verification/toast_error.png")

        browser.close()

if __name__ == "__main__":
    verify()
