from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to login page
        print("Navigating to login...")
        page.goto("http://localhost:3000/login", timeout=30000)

        # Click login as admin
        print("Logging in...")
        page.get_by_role("button", name="Login as Admin").click()

        # Wait for redirect to admin page
        page.wait_for_url("**/admin", timeout=10000)

        # Navigate to vendors page
        print("Navigating to vendors page...")
        page.goto("http://localhost:3000/admin/procurement/vendors", timeout=30000)

        # Wait for page to load
        time.sleep(3)

        # Take a screenshot to see what's on the screen before doing anything
        page.screenshot(path="verification/vendors_page.png")

        # Click "Add Vendor" to open the modal
        print("Opening add vendor modal...")
        page.get_by_role("button", name="Add Vendor").click()

        # Give modal a tiny bit of time to open
        time.sleep(2)

        # Take a screenshot to see what's on the screen
        page.screenshot(path="verification/modal_state.png")

        # Look for our specific button
        # The modal text is "Add New Vendor"
        expect(page.get_by_text("Add New Vendor")).to_be_visible()

        close_btn = page.get_by_role("button", name="Close modal")
        if close_btn.count() > 0:
            print(f"Buttons found: {close_btn.count()}")
            close_btn.first.hover()
            # Wait a moment for tooltip animation
            time.sleep(1)
            print("Taking screenshot...")
            page.screenshot(path="verification/tooltip_verification_hover.png")
            print("Success!")
        else:
            print("Button not found via aria-label.")
            print(f"Total buttons on page: {page.locator('button').count()}")

        browser.close()

if __name__ == "__main__":
    run()
