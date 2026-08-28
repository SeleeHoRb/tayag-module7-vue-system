<template>
  <section class="rounded-xl bg-white p-6 shadow-md">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">
        {{ isEditing ? 'Edit Student' : 'Add Student' }}
      </h2>

      <p class="mt-1 text-sm text-gray-500">
        {{ isEditing
          ? 'Update the student information below.'
          : 'Enter the student information below.' }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">

      <!-- Student ID -->
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">
          Student ID *
        </label>

        <input
          v-model="form.studentId"
          type="text"
          placeholder="Example: 2026-001"
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <!-- Name -->
      <div class="grid gap-5 md:grid-cols-2">

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            First Name *
          </label>

          <input
            v-model="form.firstName"
            type="text"
            placeholder="Enter first name"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Last Name *
          </label>

          <input
            v-model="form.lastName"
            type="text"
            placeholder="Enter last name"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

      </div>

      <!-- Grade and Section -->
      <div class="grid gap-5 md:grid-cols-2">

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Grade Level *
          </label>

          <select
            v-model="form.gradeLevel"
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select grade level</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Section *
          </label>

          <input
            v-model="form.section"
            type="text"
            placeholder="Example: A"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

      </div>

      <!-- Email and Status -->
      <div class="grid gap-5 md:grid-cols-2">

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="student@example.com"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            v-model="form.status"
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

      </div>

      <!-- Error -->
      <div
        v-if="errorMessage"
        class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </div>

      <!-- Buttons -->
      <div class="flex flex-wrap gap-3 pt-2">

        <button
          type="submit"
          class="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          {{ isEditing ? 'Update Student' : 'Add Student' }}
        </button>

        <button
          v-if="isEditing"
          type="button"
          @click="handleCancel"
          class="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

      </div>

    </form>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  editingStudent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const errorMessage = ref('')

const form = reactive({
  studentId: '',
  firstName: '',
  lastName: '',
  gradeLevel: '',
  section: '',
  email: '',
  status: 'Active'
})

const isEditing = ref(false)

watch(
  () => props.editingStudent,
  (student) => {
    if (student) {
      form.studentId = student.studentId
      form.firstName = student.firstName
      form.lastName = student.lastName
      form.gradeLevel = student.gradeLevel
      form.section = student.section
      form.email = student.email
      form.status = student.status
      isEditing.value = true
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function handleSubmit() {
  errorMessage.value = ''

  if (
    !form.studentId.trim() ||
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.gradeLevel ||
    !form.section.trim()
  ) {
    errorMessage.value = 'Please complete all required fields.'
    return
  }

  emit('save', {
    ...form
  })
}

function handleCancel() {
  emit('cancel')
  resetForm()
}

function resetForm() {
  form.studentId = ''
  form.firstName = ''
  form.lastName = ''
  form.gradeLevel = ''
  form.section = ''
  form.email = ''
  form.status = 'Active'
  isEditing.value = false
  errorMessage.value = ''
}
</script>