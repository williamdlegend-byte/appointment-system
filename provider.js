// provider.js
// Interactive UI logic for PPA 3
// Uses XMLHttpRequest (no Promises, no async/await)

function setMessage(text, kind) {
  const p = document.getElementById("message");
  p.textContent = text;

  if (kind === "error") {
    p.className = "error";
  } else {
    p.className = "ok";
  }
}

function addSlotRow(slot) {
  const tbody = document.getElementById("slotTableBody");

  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");

  td1.textContent = slot.startTime;
  td2.textContent = slot.endTime;
  td3.textContent = slot.status;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  tbody.appendChild(tr);
}

function parseJsonSafely(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (err) {
    return { ok: false, value: null };
  }
}

function submitNewSlot(startTime, endTime) {
  const xhr = new XMLHttpRequest();

  const requestUrl =
    "/api/slots?startTime=" + encodeURIComponent(startTime) +
    "&endTime=" + encodeURIComponent(endTime);

  xhr.open("POST", requestUrl);

  xhr.onload = function () {

    const parsed = parseJsonSafely(xhr.responseText);

    if (!parsed.ok) {
      setMessage("Invalid server response", "error");
      return;
    }

    if (xhr.status === 201) {
      addSlotRow(parsed.value);
      setMessage("Slot created successfully", "ok");

      document.getElementById("slotForm").reset();
      document.getElementById("startTime").focus();

    } else if (xhr.status === 400 || xhr.status === 409) {
      setMessage(parsed.value.error, "error");
    } else {
      setMessage("Unexpected error occurred", "error");
    }
  };

  xhr.send();
}

document.getElementById("slotForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  submitNewSlot(startTime, endTime);
});
