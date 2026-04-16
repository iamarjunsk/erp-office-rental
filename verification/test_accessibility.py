from playwright.sync_api import sync_playwright, expect

def test_auth_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test Login Page Accessibility
        page.goto("http://localhost:3000/login")
        page.wait_for_timeout(2000)

        # Verify inputs can be located by label (this implicitly tests 'for' and 'id' pairing)
        email_input = page.get_by_label("Email")
        password_input = page.locator('input#password') # get_by_label("Password", exact=True) is matching the aria-label on the button too, so use locator

        expect(email_input).to_be_visible()
        expect(password_input).to_be_visible()

        # Verify initial toggle state and aria-label
        toggle_btn = page.get_by_label("Show password", exact=True)
        expect(toggle_btn).to_be_visible()

        # Test Register Page Accessibility
        page.goto("http://localhost:3000/register")
        page.wait_for_timeout(2000)

        first_name_input = page.get_by_label("First Name")
        last_name_input = page.get_by_label("Last Name")
        email_input = page.get_by_label("Email")
        password_input = page.locator('input#password')
        confirm_password_input = page.locator('input#password_confirm')

        expect(first_name_input).to_be_visible()
        expect(last_name_input).to_be_visible()
        expect(email_input).to_be_visible()
        expect(password_input).to_be_visible()
        expect(confirm_password_input).to_be_visible()

        # Test password toggle updates aria-label
        page.goto("http://localhost:3000/login")
        page.wait_for_timeout(1000)
        toggle_btn = page.get_by_label("Show password", exact=True)
        toggle_btn.click()

        hide_btn = page.get_by_label("Hide password", exact=True)
        expect(hide_btn).to_be_visible()

        # Take a screenshot
        page.screenshot(path="verification/auth_accessibility.png")

        browser.close()

if __name__ == "__main__":
    test_auth_accessibility()
