document.addEventListener("DOMContentLoaded", () => {
  const note1Input = document.getElementById("note-1");
  const note2Input = document.getElementById("note-2");
  const note3Input = document.getElementById("note-3");
  const studentNameInput = document.getElementById("student-name");

  const btnCalculate = document.getElementById("btn-calculate");
  const gradeForm = document.getElementById("grade-form");

  const averageDisplay = document.getElementById("average-display");
  const sumDisplay = document.getElementById("sum-display");
  const formulaDisplay = document.getElementById("formula-display");
  const studentsTableBody = document.querySelector("#students-table tbody");

  let studentsList = [];
  let studentCounter = 1;

  // Función para realizar los cálculos
  function calculateAverage() {
    const n1 = parseFloat(note1Input.value) || 0;
    const n2 = parseFloat(note2Input.value) || 0;
    const n3 = parseFloat(note3Input.value) || 0;

    const sum = n1 + n2 + n3;
    const avg = sum / 3;

    // Actualización de la interfaz
    sumDisplay.textContent = `= ${sum.toFixed(1)}`;
    formulaDisplay.textContent = `= ${sum.toFixed(1)} ÷ 3 = ${avg.toFixed(1)}`;
    averageDisplay.textContent = avg.toFixed(1);

    return { sum: sum.toFixed(1), avg: avg.toFixed(1) };
  }

  // Evento del botón Calcular
  btnCalculate.addEventListener("click", calculateAverage);

  // Guardar en la tabla
  gradeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = studentNameInput.value.trim();
    if (!name) return;

    const { avg } = calculateAverage();

    // Crear registro
    const student = {
      id: studentCounter++,
      name: name,
      average: avg
    };

    studentsList.push(student);
    renderTable();

    // Resetear formulario
    gradeForm.reset();
    averageDisplay.textContent = "0.0";
    sumDisplay.textContent = "= 0.0";
    formulaDisplay.textContent = "= 0.0 ÷ 3 = 0.0";
  });

  // Renderizar la tabla de alumnos
  function renderTable() {
    studentsTableBody.innerHTML = "";
    studentsList.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.average}</td>
        <td>✏️ 🗑️</td>
      `;
      studentsTableBody.appendChild(row);
    });
  }
});
