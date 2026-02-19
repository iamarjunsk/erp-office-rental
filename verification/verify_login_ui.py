from playwright.sync_api import sync_playwright, expect
import time

def test_login_ui(page):
    page.on("console", lambda msg: print(f"Browser console: {msg.text}"))
    print("Navigating to login page...")
    try:
        page.goto("http://localhost:3000/login", timeout=30000)
    except Exception as e:
        print(f"Navigation failed: {e}")
        return

    # Wait for the page to load
    print("Waiting for page to load...")
    # Expect the loading spinner to disappear or form to appear
    # The "Checking authentication..." might take a moment if backend is slow

    try:
        # Wait for the form to appear
        print("Waiting for form elements...")
        expect(page.get_by_text("Sign in to your account")).to_be_visible(timeout=15000)

        # Check Email Input
        print("Checking Email Input...")
        email_input = page.get_by_label("Email")
        expect(email_input).to_be_visible()

        # Check Password Input
        print("Checking Password Input...")
        password_input = page.get_by_label("Password", exact=True)
        expect(password_input).to_be_visible()

        # Check Submit Button
        print("Checking Submit Button...")
        submit_button = page.get_by_role("button", name="Sign in", exact=True)
        expect(submit_button).to_be_visible()

        # Check Password Toggle Tooltip
        print("Checking Password Toggle Tooltip...")
        # Hover over the eye icon button
        toggle_button = page.get_by_label("Show password")
        expect(toggle_button).to_be_visible()
        toggle_button.hover()

        # Expect tooltip to appear
        # Shadcn tooltip might take a moment or animation
        time.sleep(1.0)
        # Radix Vue tooltip might not use role="tooltip" for visible content
        # Target visible text instead.
        # It seems there are two elements: a <p> and a hidden <span>. We target the <p>.
        tooltip = page.locator("p").filter(has_text="Show password")
        expect(tooltip).to_be_visible()

        print("Taking screenshot...")
        page.screenshot(path="verification/login_page_refactored.png")
        print("Screenshot saved to verification/login_page_refactored.png")

    except Exception as e:
        print(f"Verification failed: {e}")
        page.screenshot(path="verification/verification_failed.png")
        raise e

if __name__ == "__main__":
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_login_ui(page)
        finally:
            browser.close()
