const calendarDiv = document.getElementById("calendar");
const createButton = document.getElementById("createButton");

function renderCalendar(slots) {

  calendarDiv.innerHTML = "";

  const daysInMonth = 28;

  for (let day = 1; day <= daysInMonth; day++) {

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerText = day;

    const dayString = "2026-02-" + String(day).padStart(2, "0");

    for (let i = 0; i < slots.length; i++) {
      if (slots[i].startTime.startsWith(dayString)) {

        const slotDiv = document.createElement("div");
        slotDiv.className = "slot";
        slotDiv.innerText = slots[i].startTime.slice(11) +
                            " - " +
                            slots[i].endTime.slice(11);

        dayDiv.appendChild(slotDiv);
      }
    }

    calendarDiv.appendChild(dayDiv);
  }
}

function loadSlots() {

  fetch("/api/slots")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCalendar(data);
    });
}

createButton.onclick = function () {

  const start = document.getElementById("startInput").value;
  const end = document.getElementById("endInput").value;

  fetch("/api/slots?startTime=" + start + "&endTime=" + end, {
    method: "POST"
  })
  .then(function () {
    loadSlots();
  });
};

loadSlots();