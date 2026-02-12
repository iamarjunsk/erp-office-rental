from playwright.sync_api import Page, expect, sync_playwright
import time

def test_properties_ui_visibility(page: Page):
    # Enable console logging
    page.on("console", lambda msg: print(f"Console {msg.type}: {msg.text}"))
    page.on("pageerror", lambda err: print(f"Page Error: {err}"))

    print("Navigating to login page...")
    page.goto("http://localhost:3000/login")

    print("Logging in...")
    # Wait for the login form
    page.wait_for_selector("input[type='email']")

    # Fill login form
    page.fill("input[type='email']", "admin@officeerp.com")
    page.fill("input[type='password']", "admin123")
    page.click("button[type='submit']")

    print("Waiting for navigation...")
    # Wait for navigation to admin dashboard or properties
    page.wait_for_url("**/admin")

    print("Navigating to properties...")
    page.goto("http://localhost:3000/admin/properties")

    print("Waiting for table...")
    # Wait for table to load
    page.wait_for_selector("table")

    print("Taking screenshot of DEFAULT state...")
    # Take screenshot of the table before interaction
    page.screenshot(path="/home/jules/verification/properties_default.png")

    print("Checking for View button...")
    # Find the view button
    # Wait for ANY button in the last column
    # Use a more generic selector to see if anything is there
    buttons = page.locator("table tbody tr td:last-child button")
    count = buttons.count()
    print(f"Found {count} buttons in Actions column.")

    if count == 0:
        print("No buttons found! Dumping HTML of the first row Actions cell...")
        cell = page.locator("table tbody tr:first-child td:last-child")
        print(cell.inner_html())

    view_button = page.locator("button[aria-label='View property details']").first

    # Wait for it to be visible
    view_button.wait_for(state="visible", timeout=10000)
    expect(view_button).to_be_visible()

    print("Hovering over View button...")
    # Hover to trigger tooltip
    view_button.hover()

    print("Checking for Tooltip...")
    # Check if tooltip content appears
    tooltip_content = page.get_by_text("View property details")
    tooltip_content.wait_for(state="visible", timeout=5000)
    expect(tooltip_content).to_be_visible()

    print("Taking screenshot of HOVER state...")
    # Take screenshot of the hover state
    page.screenshot(path="/home/jules/verification/properties_hover.png")

    print("Verification successful!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()
        try:
            test_properties_ui_visibility(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
            raise
        finally:
            browser.close()
