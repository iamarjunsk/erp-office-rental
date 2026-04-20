from playwright.sync_api import sync_playwright

def verify_login_page():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to login page...")
        try:
            page.goto("http://localhost:3000/login", timeout=60000)

            # Wait for the login form to be visible
            print("Waiting for form...")
            page.wait_for_selector("form")

            # Check if title is correct (optional, but good)
            print(f"Page title: {page.title()}")

            # Verify Submit Button
            print("Verifying Submit button...")
            submit_button = page.get_by_role("button", name="Sign in")
            if not submit_button.is_visible():
                print("Submit button not found!")
            else:
                print("Submit button found.")

            # Verify Inputs via Labels (Shadcn Label should associate with Input)
            print("Verifying Email input...")
            try:
                email_input = page.get_by_label("Email")
                if email_input.is_visible():
                     print("Email input found via label.")
                else:
                     print("Email input not visible.")
            except Exception as e:
                print(f"Error finding Email input: {e}")

            print("Verifying Password input...")
            try:
                password_input = page.get_by_label("Password")
                if password_input.is_visible():
                     print("Password input found via label.")
                else:
                     print("Password input not visible.")
            except Exception as e:
                print(f"Error finding Password input: {e}")

            # Verify Demo Buttons
            print("Verifying Demo buttons...")
            admin_btn = page.get_by_role("button", name="Login as Admin")
            if admin_btn.is_visible():
                print("Admin demo button found.")
            else:
                print("Admin demo button not found.")

            manager_btn = page.get_by_role("button", name="Login as Manager")
            if manager_btn.is_visible():
                print("Manager demo button found.")
            else:
                print("Manager demo button not found.")

            # Take Screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification/login_page.png")
            print("Screenshot saved to verification/login_page.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_login_page()
