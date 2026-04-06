import re

file_path = 'app/pages/admin/maintenance/[id]/edit.vue'

with open(file_path, 'r') as f:
    content = f.read()

# Add useToast import and initialization
if 'useToast()' not in content:
    content = re.sub(
        r'(const route = useRoute\(\))',
        r'const { toast } = useToast()\n\1',
        content
    )

# Replace alert with toast
content = re.sub(
    r'alert\(`Failed to update request:\\n\$\{errors\}`\)',
    r"toast({ title: 'Error', description: errors, variant: 'destructive' })",
    content
)

content = re.sub(
    r"alert\('Failed to update maintenance request'\)",
    r"toast({ title: 'Error', description: 'Failed to update maintenance request', variant: 'destructive' })",
    content
)

# Join errors with commas
content = re.sub(
    r"\.join\('\\n'\)",
    r".join(', ')",
    content
)


with open(file_path, 'w') as f:
    f.write(content)
