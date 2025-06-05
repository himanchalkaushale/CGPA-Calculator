# Academic Performance Calculator

A modern, responsive web application designed to help students calculate their Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) based on different university grading systems. This calculator supports multiple branches (B.Sc, B.Tech, BCA) with their respective 10-point grading scales, providing real-time feedback and an intuitive user experience.

## ✨ Features

*   **SGPA Calculation**: Easily calculate your SGPA by adding courses, selecting grades, and viewing real-time grade points.
*   **CGPA Calculation**: Determine your CGPA based on your previous CGPA and current semester's SGPA. The CGPA calculator can be used independently.
*   **Multiple Grading Systems**:
    *   **B.Sc (10-Point Scale)**: O (10.0), A+ (9.0), A (8.0), B+ (7.0), B (6.0), C (5.0), P (4.0), F (0.0), Ab (0.0), N/A (0.0)
    *   **B.Tech (10-Point A-F Scale)**: A (10.0), B (8.0), C (6.0), D (4.0), E (2.0), F (0.0), Ab (0.0), N/A (0.0)
    *   **BCA (10-Point A+ Scale)**: A+ (10.0), A (9.0), B+ (8.0), B (7.0), C+ (6.0), C (5.0), D (4.0), F (0.0), Ab (0.0), N/A (0.0)
*   **Branch Selection**: Select your academic branch to apply the correct grading system.
*   **Real-time Grade Point Display**: See the numerical grade points for each selected letter grade instantly.
*   **Dynamic Course Management**: Add or remove course rows as needed for SGPA calculation.
*   **Input Validation**: Ensures SGPA/CGPA inputs are within a valid range (0-10).
*   **Responsive Design**: Optimized for seamless use across various devices, from mobile phones to desktops.
*   **Auto-Scrolling**: Automatically scrolls to the top of the course inputs section when a new course is added, ensuring visibility.
*   **Reset Functionality**: Clear all inputs and calculations with a single click.

## 🚀 Technologies Used

*   **HTML5**: For the basic structure and content of the web page.
*   **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
*   **JavaScript (ES6+)**: For all interactive functionalities, calculations, and DOM manipulation.
*   **Vite**: A fast build tool that provides an excellent development experience for modern web projects.

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

*   [Node.js & npm](https://nodejs.org/en/download/)

### Installation

1.  **Clone the repository (if applicable, otherwise skip)**:
    ```bash
    # Git is not available in this environment, so this step is illustrative.
    # If you were outside WebContainer, you would clone the repo:
    # git clone <repository-url>
    # cd academic-performance-calculator
    ```
    *Since you are in WebContainer, the files are already provided.*

2.  **Install dependencies**:
    Navigate to the project directory and install the required npm packages.
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
    This command will start a local development server, usually at `http://localhost:5173` (or another available port). The application will automatically open in your browser's preview pane.

## 💡 Usage

1.  **Select Your Branch**: Choose your academic branch (B.Sc, B.Tech, or BCA) from the dropdown menu. This will update the available grades and their corresponding points.
2.  **SGPA Calculator**:
    *   Click "Add Course" to add new rows for your subjects.
    *   For each course, select the grade you received from the dropdown. The grade points will automatically display next to your selection.
    *   Your SGPA will be calculated and displayed in real-time at the bottom of the section.
3.  **CGPA Calculator**:
    *   Enter your "Previous CGPA" in the first input field.
    *   Enter your "Current Semester SGPA" in the second input field.
    *   Your CGPA will be calculated and displayed instantly.
    *   *Note*: Both inputs are validated to ensure values are between 0.00 and 10.00.
4.  **Reset All**: Click the "Reset All" button to clear all course entries, SGPA, and CGPA inputs, and reset the branch selection to default.

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
