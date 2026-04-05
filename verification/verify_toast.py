from playwright.sync_api import sync_playwright, expect

def verify_toast():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Go to login page and login as admin
        page.goto("http://localhost:3000/login")
        # Click the "Login as Admin" demo button
        page.get_by_role("button", name="Login as Admin").click()

        # Wait for navigation to dashboard
        page.wait_for_url("http://localhost:3000/admin")

        # Let's mock the API calls so page loads
        page.route("**/api/spaces/", lambda route: route.fulfill(status=200, json=[{"id": 1, "name": "Test Space", "code": "TS-1"}]))
        page.route("**/api/companies/", lambda route: route.fulfill(status=200, json=[]))
        page.route("**/api/bookings/", lambda route: route.fulfill(status=200, json=[]))

        # --- VERIFY BOOKINGS ERROR TOAST ---
        page.goto("http://localhost:3000/admin/bookings")

        new_booking_btn = page.get_by_role("button", name="New Booking")
        new_booking_btn.wait_for(state="visible")
        new_booking_btn.click()

        # Fill required fields. Check what elements are present in form
        page.wait_for_selector("text=New Booking")

        # Title
        title_input = page.locator("input[type='text']")
        title_input.wait_for(state="visible")
        title_input.fill("Test Booking")

        # Space
        page.locator("select").first.select_option(value="1")

        # Start time and end time
        page.locator("input[type='datetime-local']").nth(0).fill("2025-01-01T10:00")
        page.locator("input[type='datetime-local']").nth(1).fill("2025-01-01T11:00")

        # Mock API to return error on POST to bookings
        page.unroute("**/api/bookings/")
        page.route("**/api/bookings/", lambda route: route.fulfill(status=400, json={"detail": "Space already booked for this time"}) if route.request.method == "POST" else route.fulfill(status=200, json=[]))

        # Submit
        submit_btn = page.get_by_role("button", name="Create Booking")
        submit_btn.wait_for(state="visible")
        submit_btn.click()

        # Expect toast to appear. The shadcn-vue toast uses role="status" or "alert"
        # We can look for the text
        toast = page.get_by_text("Space already booked for this time")
        toast.wait_for(state="visible", timeout=5000)

        # Take screenshot of error toast
        page.screenshot(path="verification/toast_error_bookings.png")

        context.close()
        browser.close()

if __name__ == "__main__":
    verify_toast()
