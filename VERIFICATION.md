# Verification Instructions

This document outlines the steps to verify the integration of the remaining modules (Bookings and Reports) into the Office ERP system.

## 1. Environment Setup

Ensure you have the following installed:
- Python 3.12+
- Node.js 18+
- Playwright (for automated verification)

### Backend

1. Navigate to the backend directory (or root if using `manage.py` from root):
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Create a superuser (if not exists):
   ```bash
   python manage.py createsuperuser
   ```
   (Or use the script provided in `verification/verify_integration.py` which sets up a test user)
5. Start the server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend  # or root if package.json is in root
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000.

## 2. Automated Verification

An automated script is provided to verify the core flows: Login -> Bookings (Create/Delete) -> Reports (View/Export).

1. Install Playwright dependencies:
   ```bash
   pip install playwright
   playwright install chromium
   ```
2. Run the script:
   ```bash
   python verification/verify_integration.py
   ```

   If successful, it will output "Booking submitted.", "Booking deleted.", and "Export triggered: ...".
   Screenshots will be saved in the `verification/` directory.

## 3. Manual Verification Steps

### Bookings Module
1. Log in to the admin panel.
2. Navigate to **Bookings** via the sidebar.
3. Verify the calendar view and list of recent bookings.
4. Click **New Booking**.
5. Fill in the form (Title, Space, Dates) and submit.
6. Verify the new booking appears in the list/calendar.
7. Click the **Delete** (trash icon) on a booking to remove it.

### Reports Module
1. Navigate to **Reports** via the sidebar.
2. Verify the dashboard cards (Occupancy, Revenue, etc.) display data.
3. Click **Export All**.
4. Verify a CSV file (`dashboard_report_YYYY-MM-DD.csv`) is downloaded containing the stats.
