<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <Header />

    <main class="mx-auto max-w-6xl px-4 py-8">

      <!-- Page Introduction -->
      <section class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800">
          Student Management
        </h2>

        <p class="mt-2 text-gray-600">
          Add, view, update, search, and delete student records.
        </p>
      </section>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
      >
        {{ successMessage }}
      </div>

      <!-- Student Form -->
      <div class="mb-8">
        <StudentForm
          :editing-student="editingStudent"
          @save="saveStudent"
          @cancel="cancelEdit"
        />
      </div>

      <!-- Student List -->
      <StudentList
        :students="students"
        @edit="startEdit"
        @delete="deleteStudent"
      />

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Header from './components/Header.vue'
import StudentForm from './components/StudentForm.vue'
import StudentList from './components/StudentList.vue'
import Footer from './components/Footer.vue'

const STORAGE_KEY = 'school-students'

const students = ref([])
const editingStudent = ref(null)
const successMessage = ref('')

/*
 * Load student records from localStorage
 */
onMounted(() => {
  const savedStudents = localStorage.getItem(STORAGE_KEY)

  if (savedStudents) {
    try {
      students.value = JSON.parse(savedStudents)
    } catch (error) {
      console.error('Unable to load student records:', error)
      students.value = []
    }
  }
})

/*
 * Save records to localStorage
 */
function saveToLocalStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students.value)
  )
}

/*
 * Show a temporary success message
 */
function showSuccessMessage(message) {
  successMessage.value = message

  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

/*
 * Add or update a student
 */
function saveStudent(studentData) {

  if (editingStudent.value) {

    const index = students.value.findIndex(
      student => student.id === editingStudent.value.id
    )

    if (index !== -1) {
      students.value[index] = {
        ...students.value[index],
        ...studentData,
        updatedAt: new Date().toISOString()
      }

      saveToLocalStorage()

      editingStudent.value = null

      showSuccessMessage(
        'Student record updated successfully.'
      )
    }

  } else {

  const duplicateStudent = students.value.some(
    student => student.studentId.trim().toLowerCase() ===
      studentData.studentId.trim().toLowerCase()
  )

  if (duplicateStudent) {
    showSuccessMessage(
      'Student ID already exists. Please use a different Student ID.'
    )
    return
  }

  const newStudent = {
    id: Date.now(),
    ...studentData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  students.value.push(newStudent)

  saveToLocalStorage()

  showSuccessMessage(
    'Student record added successfully.'
  )

    saveToLocalStorage()

    showSuccessMessage(
      'Student record added successfully.'
    )
  }
}

/*
 * Start editing a student
 */
function startEdit(student) {
  editingStudent.value = {
    ...student
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/*
 * Cancel editing
 */
function cancelEdit() {
  editingStudent.value = null
}

/*
 * Delete a student
 */
function deleteStudent(student) {

  const studentName =
    `${student.firstName} ${student.lastName}`

  const confirmed = window.confirm(
    `Are you sure you want to delete ${studentName}'s record?`
  )

  if (!confirmed) {
    return
  }

  students.value = students.value.filter(
    item => item.id !== student.id
  )

  saveToLocalStorage()

  if (
    editingStudent.value &&
    editingStudent.value.id === student.id
  ) {
    editingStudent.value = null
  }

  showSuccessMessage(
    'Student record deleted successfully.'
  )
}
</script>