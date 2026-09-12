# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
## Version 1.1.0 — Module 9 Software Evolution

### Maintenance Change
**Type:** Perfective Maintenance

**Change:** Added an Active/Inactive Student Record Filter.

### Description
The School Management System was improved by adding a status filter to the student records list. Users can now filter student records by:

- All Students
- Active
- Inactive

The new filter works together with the existing student search functionality.

### Impact Analysis
- **UI:** Added a status filter dropdown to the Student Records section.
- **Student List:** Added filtering logic based on student status.
- **Search:** Existing search functionality remains available and works together with the status filter.
- **CRUD:** Add, edit, and delete operations remain unchanged.
- **Validation:** Existing required-field and duplicate Student ID validation remain unchanged.
- **localStorage:** Existing student record storage remains unchanged.
- **Testing:** Added automated tests for Active and Inactive status filtering.
- **Build:** Production build completed successfully.

### Acceptance Criteria
- [x] Users can select All Students, Active, or Inactive.
- [x] Active filter displays only Active students.
- [x] Inactive filter displays only Inactive students.
- [x] All Students displays all records.
- [x] Search continues to work with the status filter.
- [x] Existing CRUD functionality remains functional.
- [x] Automated tests pass.
- [x] Production build passes.

### Testing Summary
- **Automated Tests:** 8 passed
- **Manual Tests:** 14 passed
- **Production Build:** Passed

### Release Notes
**Version 1.1.0**
- Added Active/Inactive student status filtering.
- Improved student record browsing and usability.
- Preserved existing CRUD, search, validation, and localStorage functionality.
- Added automated regression coverage for the new filter.