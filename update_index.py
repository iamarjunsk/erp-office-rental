import re

file_path = 'app/pages/admin/maintenance/[id]/index.vue'

with open(file_path, 'r') as f:
    content = f.read()

# Add useToast import and initialization
if 'useToast()' not in content:
    content = re.sub(
        r'(const route = useRoute\(\))',
        r'const { toast } = useToast()\n\1',
        content
    )

# Replace alerts with toasts
content = re.sub(
    r"alert\('Failed to assign request: ' \+ \(e\.data\?\.error \|\| 'Unknown error'\)\)",
    r"toast({ title: 'Error', description: 'Failed to assign request: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })",
    content
)

content = re.sub(
    r"alert\('Failed to start work: ' \+ \(e\.data\?\.error \|\| 'Unknown error'\)\)",
    r"toast({ title: 'Error', description: 'Failed to start work: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })",
    content
)

content = re.sub(
    r"alert\('Failed to complete request: ' \+ \(e\.data\?\.error \|\| 'Unknown error'\)\)",
    r"toast({ title: 'Error', description: 'Failed to complete request: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })",
    content
)

content = re.sub(
    r"alert\('Failed to add comment: ' \+ \(e\.data\?\.error \|\| 'Unknown error'\)\)",
    r"toast({ title: 'Error', description: 'Failed to add comment: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })",
    content
)


with open(file_path, 'w') as f:
    f.write(content)
