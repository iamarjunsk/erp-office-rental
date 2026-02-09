"""
Create demo users for testing the application.
"""
from django.core.management.base import BaseCommand
from apps.users.models import User

class Command(BaseCommand):
    help = 'Create demo users for testing'

    def handle(self, *args, **kwargs):
        users_data = [
            {
                'email': 'admin@officeerp.com',
                'password': 'admin123',
                'first_name': 'Admin',
                'last_name': 'User',
                'role': 'admin',
                'is_staff': True,
            },
            {
                'email': 'manager@officeerp.com',
                'password': 'manager123',
                'first_name': 'Manager',
                'last_name': 'User',
                'role': 'manager',
            },
            {
                'email': 'staff@officeerp.com',
                'password': 'staff123',
                'first_name': 'Staff',
                'last_name': 'User',
                'role': 'staff',
            },
        ]

        for user_data in users_data:
            email = user_data['email']
            password = user_data.pop('password')
            
            if not User.objects.filter(email=email).exists():
                user = User.objects.create_user(**user_data)
                user.set_password(password)
                user.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Created user: {email} / {password}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'User already exists: {email}')
                )

        self.stdout.write(self.style.SUCCESS('Demo users created successfully!'))
