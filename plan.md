1. **Understand the Goal**: Replace `alert()` usage with `useToast()` from shadcn-vue to improve user experience and accessibility, as per Palette instructions.
2. **Select Target**: Update `app/pages/admin/maintenance/create.vue` to replace its two `alert()` calls with `toast()`.
3. **Implementation Details**:
   - Add `const { toast } = useToast()` to the `<script setup>` block.
   - Replace `alert('Failed to create maintenance request')` with `toast({ title: 'Error', description: 'Failed to create maintenance request', variant: 'destructive' })`.
   - Replace `alert(\`Failed to create request:\n${errors}\`)` with `toast({ title: 'Error', description: \`Failed to create request:\n${errors}\`, variant: 'destructive' })`.
4. **Select Target 2**: Update `app/pages/admin/maintenance/[id]/edit.vue` to replace its two `alert()` calls with `toast()`.
   - Add `const { toast } = useToast()` to the `<script setup>` block.
   - Replace `alert('Failed to update maintenance request')` with `toast({ title: 'Error', description: 'Failed to update maintenance request', variant: 'destructive' })`.
   - Replace `alert(\`Failed to update request:\n${errors}\`)` with `toast({ title: 'Error', description: \`Failed to update request:\n${errors}\`, variant: 'destructive' })`.
5. **Add Journal Entry**: Log this update in `.jules/palette.md` noting that native alerts were replaced with shadcn-vue toasts for better UX.
6. **Pre-commit Checks**: Run pnpm lint and type-check, etc.
7. **Submit**: Create PR titled `🎨 Palette: Replace native alerts with shadcn toasts in maintenance forms`.
