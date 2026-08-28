<template>
  <section class="rounded-xl bg-white p-6 shadow-md">
    <div class="mb-5">
      <h2 class="text-xl font-bold text-gray-800">
        Student Records
      </h2>

      <p class="mt-1 text-sm text-gray-500">
        View and manage registered students.
      </p>
    </div>

    <div class="mb-5">
      <input
        v-model="search"
        type="text"
        placeholder="Search by student ID or name..."
        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>

    <div class="mb-4 text-sm text-gray-600">
      Total Students: <strong>{{ filteredStudents.length }}</strong>
    </div>

    <div v-if="filteredStudents.length === 0" class="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
      No student records found.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-200 text-left text-sm text-gray-600">
            <th class="px-4 py-3">Student ID</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Grade</th>
            <th class="px-4 py-3">Section</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="student in filteredStudents"
            :key="student.id"
            class="border-b border-gray-100 hover:bg-gray-50"
          >
            <td class="px-4 py-3 font-medium">
              {{ student.studentId }}
            </td>

            <td class="px-4 py-3">
              {{ student.firstName }} {{ student.lastName }}
            </td>

            <td class="px-4 py-3">
              {{ student.gradeLevel }}
            </td>

            <td class="px-4 py-3">
              {{ student.section }}
            </td>

            <td class="px-4 py-3">
              {{ student.status }}
            </td>

            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  @click="$emit('edit', student)"
                  class="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Edit
                </button>

                <button
                  @click="$emit('delete', student)"
                  class="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  students: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'delete'])

const search = ref('')

const filteredStudents = computed(() => {
  const keyword = search.value.toLowerCase().trim()

  if (!keyword) {
    return props.students
  }

  return props.students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()

    return (
      student.studentId.toLowerCase().includes(keyword) ||
      fullName.includes(keyword)
    )
  })
})
</script>