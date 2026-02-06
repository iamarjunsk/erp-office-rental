<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/admin')
    }
  ]
})
</script>

<template>
  <div>Redirecting...</div>
</template>
