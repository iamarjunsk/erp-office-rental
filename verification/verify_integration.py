from playwright.sync_api import sync_playwright, expect
import time
import os

def run():
    # Ensure verification directory exists
    if not os.path.exists('verification'):
        os.makedirs('verification')

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to ensure elements are visible
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # Increase default timeout
        page.set_default_timeout(15000)

        try:
            # Login
            print("Navigating to login...")
            page.goto('http://localhost:3000/login')
            page.wait_for_load_state('networkidle')

            print("Filling login form...")
            page.fill('input[type="email"]', 'testadmin@example.com')
            page.fill('input[type="password"]', 'password123')
            page.click('button[type="submit"]')

            print("Waiting for navigation after login...")
            page.wait_for_url('**/admin', timeout=15000)
            print(f"Logged in. Current URL: {page.url}")

            # Verify Bookings
            print("Navigating to Bookings...")
            page.goto('http://localhost:3000/admin/bookings')
            page.wait_for_load_state('networkidle')

            try:
                # Wait for the heading
                heading = page.locator('h1.text-3xl.font-bold:has-text("Bookings")')
                heading.wait_for(state='visible', timeout=15000)
                expect(heading).to_be_visible()

                # Check if we are redirected to login
                if '/login' in page.url:
                    raise Exception("Redirected to login page unexpectedly")

                page.screenshot(path='verification/bookings_list.png')
                print("Bookings list screenshot taken.")
            except Exception as e:
                print(f"Bookings page verification failed: {e}")
                print(f"Current URL: {page.url}")
                page.screenshot(path='verification/bookings_load_error.png')
                raise e

            # Create Booking
            print("Creating Booking...")
            try:
                # Click New Booking
                new_booking_btn = page.locator('button:has-text("New Booking")')
                new_booking_btn.wait_for(state='visible')
                new_booking_btn.click()

                # Wait for modal
                modal = page.locator('h3:has-text("New Booking")')
                modal.wait_for(state='visible', timeout=5000)

                print("Modal opened. Filling form...")
                page.fill('input[type="text"]', 'Test Meeting')

                # Select space - try force click if needed or just select option
                # Use evaluate to force select if standard interaction fails
                # page.select_option('select:nth-of-type(1)', index=1)
                # Let's try to target by labels if possible, or use more specific selectors

                # Assuming first select is Space
                space_select = page.locator('select').nth(0)
                space_select.select_option(index=1)

                # Fill dates
                # Using nth() instead of CSS nth-of-type because inputs are in different containers
                page.locator('input[type="datetime-local"]').nth(0).fill('2026-02-05T10:00')
                page.locator('input[type="datetime-local"]').nth(1).fill('2026-02-05T12:00')

                page.screenshot(path='verification/bookings_modal.png')
                print("Booking modal screenshot taken.")

                # Submit
                page.click('button[type="submit"]')

                # Wait for modal to close (or check for success message if any)
                modal.wait_for(state='hidden', timeout=5000)

                # Wait for list update (network idle might be enough)
                page.wait_for_load_state('networkidle')

                page.screenshot(path='verification/bookings_submitted.png')
                print("Booking submitted.")

            except Exception as e:
                print(f"Failed to create booking: {e}")
                print(f"Current URL: {page.url}")
                page.screenshot(path='verification/bookings_create_error.png')
                # If we failed here, we might be stuck with a modal open or on a wrong page.
                # Refresh to clean up state for next step
                page.reload()

            # Delete Booking
            print("Deleting Booking...")
            try:
                # Wait for list to be populated
                # We expect at least one booking now
                delete_btn = page.locator('button[title="Delete Booking"]').first

                # Wait for button to be visible, with a small retry if needed
                try:
                    delete_btn.wait_for(state='visible', timeout=5000)
                except:
                    print("Delete button not immediately visible, reloading...")
                    page.reload()
                    page.wait_for_load_state('networkidle')
                    delete_btn = page.locator('button[title="Delete Booking"]').first
                    delete_btn.wait_for(state='visible', timeout=5000)

                if delete_btn.count() > 0:

                    # Handle dialog
                    page.on("dialog", lambda dialog: dialog.accept())

                    delete_btn.click()

                    # Wait for network idle after delete
                    page.wait_for_load_state('networkidle')
                    time.sleep(2) # Extra buffer

                    page.screenshot(path='verification/bookings_deleted.png')
                    print("Booking deleted.")
                else:
                    print("No bookings found to delete.")

            except Exception as e:
                print(f"Failed to delete booking: {e}")
                page.screenshot(path='verification/bookings_delete_error.png')

            # Verify Reports
            print("Navigating to Reports...")
            page.goto('http://localhost:3000/admin/reports')
            page.wait_for_load_state('networkidle')

            try:
                heading = page.locator('h1.text-3xl.font-bold:has-text("Reports")')
                heading.wait_for(state='visible', timeout=15000)
                expect(heading).to_be_visible()

                page.screenshot(path='verification/reports_dashboard.png')
                print("Reports dashboard screenshot taken.")

                # Test Export
                print("Testing Export...")
                try:
                    export_btn = page.locator('button:has-text("Export All")')
                    export_btn.wait_for(state='visible')

                    # Note: downloading in headless mode might not trigger the event exactly as expected in all environments
                    # Use a simpler check if download event is flaky
                    with page.expect_download(timeout=10000) as download_info:
                        export_btn.click()

                    download = download_info.value
                    print(f"Export triggered: {download.suggested_filename}")
                except Exception as ie:
                     print(f"Export didn't trigger download immediately or timeout: {ie}")
                     # If timeout, check if we got a network error or if the button was clicked
                     page.screenshot(path='verification/export_error.png')

            except Exception as e:
                print(f"Failed to verify Reports/Export: {e}")
                page.screenshot(path='verification/reports_error.png')

        except Exception as global_e:
            print(f"Global verification failure: {global_e}")
            page.screenshot(path='verification/global_error.png')

        finally:
            browser.close()

if __name__ == '__main__':
    run()
