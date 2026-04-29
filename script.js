let editId = null;

// Load all students
function loadStudents() {
    fetch("/api/students")
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(s => {
            list.innerHTML += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>
                        <button onclick="editStudent(${s.id}, '${s.name}', '${s.email}', '${s.course}')">Edit</button>
                        <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    });
}

// Add or Update
function saveStudent() {
    let student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    if (editId == null) {
        // ADD
        fetch("/api/students", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(student)
        }).then(() => loadStudents());
    } else {
        // UPDATE
        fetch("/api/students/" + editId, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(student)
        }).then(() => {
            editId = null;
            loadStudents();
        });
    }
}

// Delete
function deleteStudent(id) {
    fetch("/api/students/" + id, {
        method: "DELETE"
    }).then(() => loadStudents());
}

// Edit
function editStudent(id, name, email, course) {
    editId = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("course").value = course;
}

// Search
function searchStudent() {
    let name = document.getElementById("search").value;

    fetch("/api/students/search/" + name)
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(s => {
            list.innerHTML += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>
                        <button onclick="editStudent(${s.id}, '${s.name}', '${s.email}', '${s.course}')">Edit</button>
                        <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    });
}

// Auto load
loadStudents();