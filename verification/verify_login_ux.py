from playwright.sync_api import sync_playwright, expect
import time

def verify_login_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Intercept and delay login request to verify loading state
        def handle_login(route):
            print("Intercepted login request. Delaying...")
            time.sleep(2)
            route.continue_()

        # Match exactly the login endpoint
        page.route("**/api/users/login/", handle_login)

        # Navigate to login page
        print("Navigating to login page...")
        # Use localhost as per useAuth config
        page.goto("http://localhost:3000/login")

        # Verify aria-label on password toggle
        print("Verifying aria-label on password toggle...")
        toggle_btn = page.locator('button[aria-label="Toggle password visibility"]')
        expect(toggle_btn).to_be_visible()

        # Click "Login as Admin"
        print("Clicking 'Login as Admin'...")
        admin_btn = page.get_by_text("Login as Admin")
        admin_btn.click()

        # Verify loading state
        print("Verifying loading state...")
        # The text should change to "Logging in..."
        loading_text = page.get_by_text("Logging in...")
        expect(loading_text).to_be_visible()

        # The button (parent of the text) should be disabled
        # We can find the button by the text "Logging in..."
        loading_btn = page.locator("button").filter(has_text="Logging in...")
        expect(loading_btn).to_be_disabled()

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/login_loading_state.png")
        print("Screenshot saved to verification/login_loading_state.png")

        browser.close()

if __name__ == "__main__":
    verify_login_ux()
