document.addEventListener('DOMContentLoaded', () => {
  const courseInputsContainer = document.getElementById('course-inputs');
  const addCourseBtn = document.getElementById('add-course');
  const sgpaResultDisplay = document.getElementById('sgpa-result');
  const prevCgpaInput = document.getElementById('prev-cgpa');
  const currentSgpaInput = document.getElementById('current-sgpa');
  const cgpaResultDisplay = document.getElementById('cgpa-result');
  const resetAllBtn = document.getElementById('reset-all');
  const branchSelect = document.getElementById('branch-select');

  let courseCount = 0;

  // Define different grading systems
  const gradingSystems = {
    'B.Sc': {
      'O': 10.0, 'A+': 9.0, 'A': 8.0,
      'B+': 7.0, 'B': 6.0, 'C': 5.0,
      'P': 4.0, 'F': 0.0, 'Ab': 0.0,
      'N/A': 0.0 // For courses not yet graded or excluded
    },
    'B.Tech': { // New 10-point A-F scale for B.Tech
      'A': 10.0, 'B': 8.0, 'C': 6.0,
      'D': 4.0, 'E': 2.0, 'F': 0.0,
      'Ab': 0.0, 'N/A': 0.0
    },
    'BCA': { // New 10-point A+ scale for BCA
      'A+': 10.0, 'A': 9.0, 'B+': 8.0,
      'B': 7.0, 'C+': 6.0, 'C': 5.0,
      'D': 4.0, 'F': 0.0, 'Ab': 0.0,
      'N/A': 0.0
    }
  };

  let currentGradePoints = gradingSystems['B.Sc']; // Default to B.Sc

  // Function to update grade options in all course rows
  function updateGradeOptions() {
    const gradeOptionsHtml = Object.keys(currentGradePoints).map(grade =>
      `<option value="${grade}">${grade}</option>`
    ).join('');

    document.querySelectorAll('.course-grade').forEach(selectElement => {
      const currentSelectedValue = selectElement.value; // Preserve current selection if possible
      selectElement.innerHTML = `<option value="N/A">Select Grade</option>${gradeOptionsHtml}`;
      // Try to re-select the previous value if it exists in the new system
      if (currentGradePoints.hasOwnProperty(currentSelectedValue)) {
        selectElement.value = currentSelectedValue;
      } else {
        selectElement.value = 'N/A'; // Reset if not available
      }
    });
    updateDisplayedGradePoints(); // Update displayed points after options change
  }

  // Function to add a new course input row
  function addCourseRow() {
    courseCount++;
    const courseRow = document.createElement('div');
    // Added 'mb-4' for spacing between rows on mobile
    courseRow.classList.add('flex', 'flex-col', 'md:flex-row', 'gap-3', 'items-center', 'bg-gray-700', 'p-4', 'rounded-lg', 'shadow-sm', 'border', 'border-border', 'mb-4');
    courseRow.innerHTML = `
      <input type="text" placeholder="Course Name (Optional)"
             class="w-full md:flex-1 p-2 rounded-md bg-gray-600 border border-border text-text focus:ring-1 focus:ring-primary focus:border-transparent transition duration-200">
      <select class="w-full md:w-auto p-2 rounded-md bg-gray-600 border border-border text-text focus:ring-1 focus:ring-primary focus:border-transparent transition duration-200 course-grade">
        <option value="N/A">Select Grade</option>
        ${Object.keys(currentGradePoints).map(grade => `<option value="${grade}">${grade}</option>`).join('')}
      </select>
      <span class="w-full md:w-auto course-grade-points text-center text-lg font-semibold text-accent bg-gray-600 p-2 rounded-md border border-border flex-shrink-0">0.0</span>
      <button class="w-full md:w-auto remove-course bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clip-rule="evenodd" />
        </svg>
      </button>
    `;
    courseInputsContainer.appendChild(courseRow);

    // Add event listeners to the new inputs
    const gradeSelect = courseRow.querySelector('.course-grade');
    const removeBtn = courseRow.querySelector('.remove-course');

    gradeSelect.addEventListener('change', () => {
      updateDisplayedGradePointsForRow(courseRow); // Update individual grade point display
      calculateAll();
    });
    removeBtn.addEventListener('click', () => {
      courseInputsContainer.removeChild(courseRow);
      calculateAll();
    });

    // Initialize the grade point display for the new row
    updateDisplayedGradePointsForRow(courseRow);

    // Scroll to the top of the course inputs container
    courseInputsContainer.scrollTop = 0;
  }

  // Function to update the displayed grade points for all rows
  function updateDisplayedGradePoints() {
    document.querySelectorAll('.flex.flex-col.md\\:flex-row').forEach(row => {
      updateDisplayedGradePointsForRow(row);
    });
  }

  // Function to update the displayed grade points for a single row
  function updateDisplayedGradePointsForRow(row) {
    const gradeSelect = row.querySelector('.course-grade');
    const gradePointsDisplay = row.querySelector('.course-grade-points');
    const selectedGrade = gradeSelect.value;
    const points = currentGradePoints[selectedGrade] || 0;
    gradePointsDisplay.textContent = points.toFixed(1); // Display with one decimal place
  }

  // Function to calculate SGPA
  function calculateSGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0; 

    const courseRows = courseInputsContainer.querySelectorAll('.flex.flex-col.md\\:flex-row');
    courseRows.forEach(row => {
      const credits = 3.0; // Assuming a default of 3 credits per course if input is removed
      const gradeSelect = row.querySelector('.course-grade');

      const grade = gradeSelect.value;
      const points = currentGradePoints[grade] || 0; // Use currentGradePoints

      totalGradePoints += (credits * points);
      totalCredits += credits;
    });

    const sgpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
    sgpaResultDisplay.textContent = sgpa.toFixed(2);
    return { sgpa, totalCredits };
  }

  // Function to calculate CGPA
  function calculateCGPA() {
    const prevCgpa = parseFloat(prevCgpaInput.value) || 0;
    const currentSgpa = parseFloat(currentSgpaInput.value) || 0;

    let cgpa = 0;
    if (prevCgpa > 0 && currentSgpa > 0) {
      cgpa = (prevCgpa + currentSgpa) / 2;
    } else if (prevCgpa > 0) {
      cgpa = prevCgpa;
    } else if (currentSgpa > 0) {
      cgpa = currentSgpa;
    }

    cgpaResultDisplay.textContent = cgpa.toFixed(2);
  }

  // Combined calculation function
  function calculateAll() {
    calculateSGPA(); // Still calculate SGPA to update its display
    calculateCGPA();
  }

  // Helper function for input validation and formatting
  function validateAndFormatInput(inputElement) {
    let value = parseFloat(inputElement.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 10) {
      value = 10;
    }
    inputElement.value = value.toFixed(2);
  }

  // Event Listeners
  addCourseBtn.addEventListener('click', addCourseRow);

  // Apply validation and formatting on blur for both CGPA inputs
  prevCgpaInput.addEventListener('blur', () => {
    validateAndFormatInput(prevCgpaInput);
    calculateAll();
  });

  currentSgpaInput.addEventListener('blur', () => {
    validateAndFormatInput(currentSgpaInput);
    calculateAll();
  });

  // Recalculate on input for immediate feedback, but don't format until blur
  prevCgpaInput.addEventListener('input', calculateAll);
  currentSgpaInput.addEventListener('input', calculateAll);


  branchSelect.addEventListener('change', (event) => {
    const selectedBranch = event.target.value;
    currentGradePoints = gradingSystems[selectedBranch];
    updateGradeOptions(); // Update grade options in existing rows and trigger point update
    calculateAll(); // Recalculate with new grading system
  });

  resetAllBtn.addEventListener('click', () => {
    courseInputsContainer.innerHTML = ''; // Clear all course rows
    addCourseRow(); // Add one default row back
    prevCgpaInput.value = '0.00';
    currentSgpaInput.value = '0.00'; // Reset current SGPA
    branchSelect.value = 'B.Sc'; // Reset branch selection
    currentGradePoints = gradingSystems['B.Sc']; // Reset grade points
    updateGradeOptions(); // Update grade options for B.Sc and trigger point update
    calculateAll(); // Recalculate everything
  });

  // Initialize with one course row and initial calculation
  addCourseRow();
  updateGradeOptions(); // Ensure initial grade options are correct and points are displayed
  calculateAll();
});
