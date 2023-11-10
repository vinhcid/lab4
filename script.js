const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const birthdayInput = document.getElementById('birthday'); // Changed from 'age' to 'birthday'
const emailInput = document.getElementById('email');
const mssv = document.getElementById('mssv');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);
// Function to check for duplicate names
function isDuplicateName(email) {
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase()
  );
}

function displayRecords() {
  recordList.innerHTML = '';
  console.log(records.length);
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.birthday}</td>
                    <td>${record.email}</td>
                    <td>${record.mssv}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}


// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const birthday = birthdayInput.value; 
  const email = emailInput.value;
  const mssvValue = mssv.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && birthday && email) { 
    if (isDuplicateName(email) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ name, birthday, email, mssv: mssvValue}); 
    } else {
      // Update an existing record
      records[editIndex] = { name, birthday, email, mssv: mssvValue}; 
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    birthdayInput.value = ''; 
    emailInput.value = '';
    mssv.value = '';
    displayRecords();
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  birthdayInput.value = recordToEdit.birthday; 
  emailInput.value = recordToEdit.email;
  mssv.value = recordToEdit.mssv;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}

function findRecord(records, searchValue) {
  return records.find(record => record.name === searchValue || record.mssv === searchValue);
}

function searchRecord() {
  const searchInput = document.getElementById('search-input');
  const searchResult = document.getElementById('search-result');
  const searchValue = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search

  const foundRecords = records.filter((record) => {
    return (
      record.name.toLowerCase().includes(searchValue) ||
      record.mssv.toLowerCase().includes(searchValue)
    );
  });

  if (foundRecords.length > 0) {
    searchResult.innerHTML = ''; // Clear previous search results
    foundRecords.forEach((record) => {
      searchResult.innerHTML += `<p>${record.name}, Mã số sinh viên: ${record.mssv}</p>`;
    });
  } else {
    searchResult.innerHTML = 'Không tìm thấy kết quả';
  }
}
function searchRecord() {
  const searchInput = document.getElementById('search-input');
  const searchResult = document.getElementById('search-result');
  const searchValue = searchInput.value;
  const foundRecord = findRecord(records, searchValue);
  if (foundRecord) {
    searchResult.innerHTML = `<p>${record.name}, Mã số sinh viên: ${record.mssv}</p>`;
  } else {
    searchResult.innerHTML = 'không tìm thấy';
  }
}

recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const birthday = birthdayInput.value;
  const email = emailInput.value;
  const mssvValue = mssv.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && birthday && email) {
    if (isDuplicateName(email) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ name, birthday, email, mssv: mssvValue });
    } else {
      // Update an existing record
      records[editIndex] = { name, birthday, email, mssv: mssvValue };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    birthdayInput.value = '';
    emailInput.value = '';
    mssv.value = '';
    displayRecords(); // This will update the displayed records
  }
});

// ...

// Display records
function displayRecords() {
  // Clear only the contents of the recordList
  recordList.innerHTML = '';

  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align:center;color:red;">danh sách trống</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');

      const birthdayDate = new Date(record.birthday);
      const formattedBirthday = `${('0' + birthdayDate.getDate()).slice(-2)}-${('0' + (birthdayDate.getMonth() + 1)).slice(-2)}-${birthdayDate.getFullYear()}`;

      row.innerHTML = `
        <td>${record.name}</td>
        <td>${formattedBirthday}</td>
        <td>${record.email}</td>
        <td>${record.mssv}</td>
        <td><button onclick="editRecord(${index})">Sửa</button></td>
        <td class="deleteButton"><button onclick="deleteRecord(${index})">Xóa</button></td>
      `;
      recordList.appendChild(row);
    });
  }
}
// Initial display
displayRecords();
