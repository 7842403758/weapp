const form = document.getElementById('signupForm');
const userTable = document.getElementById('userTable');
const userCount = document.getElementById('userCount');

// Fetch users on page load
async function fetchUsers() {
  const response = await fetch('/api/users');
  const data = await response.json();
  populateTable(data.users);
  userCount.textContent = data.count;
}

// Populate table with user data
function populateTable(users) {
  userTable.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.id}</td><td>${user.username}</td><td>${user.email}</td>`;
    userTable.appendChild(row);
  });
}

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { 'Content-Type': 'application/json' }
  });
  fetchUsers();
  form.reset();
});

// Initial load
fetchUsers();
