from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_login_page(page: Page):
    print("Navigating to login page...")
    # 1. Arrange: Go to the login page.
    page.goto("http://localhost:3000/login")

    # Wait a bit for client-side hydration
    time.sleep(2)

    print("Checking for OfficeERP heading...")
    # 2. Act: Wait for the page to load.
    # The new login page has "OfficeERP" text.
    expect(page.get_by_role("heading", name="OfficeERP")).to_be_visible()

    print("Checking for Sign in button...")
    # 3. Assert: Check for shadcn components.
    # Button with text "Sign in"
    # We replaced the manual button with shadcn Button.
    sign_in_button = page.get_by_role("button", name="Sign in")
    expect(sign_in_button).to_be_visible()

    print("Checking for Email input...")
    # Inputs
    # We used <Label for="email">Email</Label> and <Input id="email">
    # So get_by_label("Email") should work.
    email_input = page.get_by_label("Email")
    expect(email_input).to_be_visible()

    print("Checking for Password input...")
    password_input = page.get_by_label("Password")
    expect(password_input).to_be_visible()

    print("Taking screenshot...")
    # 4. Screenshot: Capture the final result.
    page.screenshot(path="verification/login_page.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_login_page(page)
            print("Verification script completed successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            # Take screenshot on failure too
            page.screenshot(path="verification/login_page_failed.png")
        finally:
            browser.close()
