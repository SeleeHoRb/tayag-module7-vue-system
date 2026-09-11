import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentForm from '../src/components/StudentForm.vue'
import App from '../src/App.vue'

describe('School Management System', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  it('should emit a save event when a valid student is submitted', async () => {
    const wrapper = mount(StudentForm)

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('2026-001')
    await inputs[1].setValue('Juan')
    await inputs[2].setValue('Dela Cruz')

    await wrapper.findAll('select')[0].setValue('Grade 7')
    await inputs[3].setValue('A')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')[0][0]).toMatchObject({
      studentId: '2026-001',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      gradeLevel: 'Grade 7',
      section: 'A'
    })
  })

  it('should display the student information when editing a record', () => {
    const student = {
      id: 1,
      studentId: '2026-001',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      gradeLevel: 'Grade 7',
      section: 'A',
      email: 'juan@example.com',
      status: 'Active'
    }

    const wrapper = mount(StudentForm, {
      props: {
        editingStudent: student
      }
    })

    expect(wrapper.find('input').element.value).toBe('2026-001')
    expect(wrapper.text()).toContain('Edit Student')
    expect(wrapper.text()).toContain('Update Student')
  })

  it('should reject submission when required fields are empty', async () => {
    const wrapper = mount(StudentForm)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain(
      'Please complete all required fields.'
    )

    expect(wrapper.emitted('save')).toBeFalsy()
  })

  it('should emit cancel when the Cancel button is clicked', async () => {
    const student = {
      id: 1,
      studentId: '2026-001',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      gradeLevel: 'Grade 7',
      section: 'A',
      email: '',
      status: 'Active'
    }

    const wrapper = mount(StudentForm, {
      props: {
        editingStudent: student
      }
    })

    const cancelButton = wrapper.findAll('button')
      .find(button => button.text() === 'Cancel')

    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should allow the student status to be changed', async () => {
    const wrapper = mount(StudentForm)

    const selects = wrapper.findAll('select')

    await selects[0].setValue('Grade 10')
    await selects[1].setValue('Inactive')

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('2026-002')
    await inputs[1].setValue('Maria')
    await inputs[2].setValue('Santos')
    await inputs[3].setValue('B')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('save')[0][0].status).toBe('Inactive')
  })
it('should prevent adding a student with a duplicate Student ID', async () => {
  const existingStudent = {
    id: 1,
    studentId: '2026-001',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    gradeLevel: 'Grade 7',
    section: 'A',
    email: '',
    status: 'Active'
  }

  localStorage.setItem(
    'school-students',
    JSON.stringify([existingStudent])
  )

  const wrapper = mount(App)

  await new Promise(resolve => setTimeout(resolve, 0))

  const form = wrapper.findComponent(StudentForm)

  await form.findAll('input')[0].setValue('2026-001')
  await form.findAll('input')[1].setValue('Maria')
  await form.findAll('input')[2].setValue('Santos')
  await form.findAll('select')[0].setValue('Grade 8')
  await form.findAll('input')[3].setValue('B')

  await form.find('form').trigger('submit')

  const savedStudents = JSON.parse(
    localStorage.getItem('school-students')
  )

  expect(savedStudents).toHaveLength(1)
  expect(savedStudents[0].studentId).toBe('2026-001')
})
})