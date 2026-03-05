from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch()
        page = browser.new_page()

        # Route API to simulate an error response for property creation
        page.route("**/api/properties/", lambda route: route.fulfill(
            status=400,
            json={"code": ["This field must be unique."]}
        ))

        # Navigate to login page
        page.goto("http://localhost:3000/login")

        # Click the "Login as Admin" demo button
        page.click("text=Login as Admin")

        # Wait for navigation to dashboard
        page.wait_for_url("**/admin*")

        # Navigate to create property page
        page.goto("http://localhost:3000/admin/properties/create")

        # Fill in the form
        page.fill("input[placeholder='PROP-001']", "PROP-999")
        page.fill("input[placeholder='Cyber Towers']", "Test Property")
        page.select_option("select", "commercial")
        page.fill("input[placeholder='50000']", "10000")
        page.fill("input[placeholder='Full address']", "123 Test St")
        page.fill("input[placeholder='Hyderabad']", "Test City")
        page.fill("input[placeholder='Telangana']", "Test State")
        page.fill("input[placeholder='500081']", "123456")

        # Submit form
        page.click("button:has-text('Create Property')")

        # Wait for the toast to appear
        page.wait_for_selector(".toaster", state="visible")

        # Take a screenshot
        page.screenshot(path="verification/toast_error.png")

        browser.close()

if __name__ == "__main__":
    verify()
