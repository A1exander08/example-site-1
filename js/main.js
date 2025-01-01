const containerEl = document.querySelector(".jss-container");

const planets = ["Moon", "Saturn", "Mars", "Jupiter", "Venus"];

let characterIndex = 0;
let planetsIndex = 0;
let isDeleting = false;

updateText();

function updateText() {
  const currentWord = planets[planetsIndex];

  if (isDeleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  containerEl.innerHTML = `<h1 class="display-1 text-white">${currentWord.slice(
    0,
    characterIndex
  )}|</h1>`;

  let timeout = 150;

  if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    planetsIndex++;
    if (planetsIndex === planets.length) {
      planetsIndex = 0;
    }
    timeout = 1000;
  }

  if (!isDeleting && characterIndex === currentWord.length) {
    timeout = 1000;
    isDeleting = true;
  }

  setTimeout(updateText, timeout);
}

// CALENDAR
let currentDate = new Date();
let selectedDate = null;

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function isDateDisabled(day, month, year) {
  const seed = day + month * 100 + year * 10000;
  return seededRandom(seed) < 0.7;
}

function renderCalendar(calendarId, monthYearId) {
  const calendar = document.getElementById(calendarId);
  const monthYear = document.getElementById(monthYearId);

  if (!calendar || !monthYear) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  monthYear.textContent = firstDay.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const days = [];
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push("");
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }

  let html = "";
  days.forEach((day, index) => {
    if (index % 7 === 0) html += '<div class="row">';

    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    const isDisabled = day && isDateDisabled(day, month, year);
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    html += `
      <div class="col p-1">
        <div class="calendar-day d-flex align-items-center justify-content-center border rounded
          ${day ? "" : "border-0"}
          ${isDisabled ? "disabled" : ""}
          ${isToday ? "today" : ""}
          ${isSelected ? "selected" : ""}"
          onclick="selectDate(${day}, ${month}, ${year})">
          ${day || ""}
        </div>
      </div>`;

    if (index % 7 === 6) html += "</div>";
  });

  calendar.innerHTML = html;
}

function changeMonth(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar("calendar", "monthYear");
  renderCalendar("calendar-venus", "monthYear-venus");
  renderCalendar("calendar-saturn", "monthYear-saturn");
  renderCalendar("calendar-mars", "monthYear-mars");
}

function selectDate(day, month, year) {
  if (!day) return;
  selectedDate = new Date(year, month, day);
  renderCalendar("calendar", "monthYear");
  renderCalendar("calendar-venus", "monthYear-venus");
  renderCalendar("calendar-saturn", "monthYear-saturn");
  renderCalendar("calendar-mars", "monthYear-mars");
}

// Initialize both calendars
renderCalendar("calendar", "monthYear");
renderCalendar("calendar-venus", "monthYear-venus");
renderCalendar("calendar-saturn", "monthYear-saturn");
renderCalendar("calendar-mars", "monthYear-mars");

// MODAL
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});
