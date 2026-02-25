from playwright.sync_api import Page, expect, sync_playwright
import time

def test_login_ui(page: Page):
    print("Navigating to login page...")
    page.goto("http://localhost:3000/login")

    # Wait for the page to load
    page.wait_for_load_state("networkidle")

    # Check if OfficeERP title is visible
    expect(page.get_by_role("heading", name="OfficeERP")).to_be_visible()

    # Check if Email label is visible (this confirms Label component)
    expect(page.get_by_label("Email")).to_be_visible()

    # Check if input fields are present
    expect(page.get_by_placeholder("you@example.com")).to_be_visible()
    expect(page.get_by_placeholder("••••••••")).to_be_visible()

    # Check if "Sign in" button is present (this confirms Button component)
    expect(page.get_by_role("button", name="Sign in")).to_be_visible()

    # Toggle password visibility
    toggle_btn = page.get_by_label("Toggle password visibility")
    expect(toggle_btn).to_be_visible()
    toggle_btn.click()

    # After click, input type should be text
    password_input = page.get_by_placeholder("••••••••")
    expect(password_input).to_have_attribute("type", "text")

    print("Taking screenshot...")
    page.screenshot(path="verification/login_ui.png")
    print("Screenshot saved to verification/login_ui.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_login_ui(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
