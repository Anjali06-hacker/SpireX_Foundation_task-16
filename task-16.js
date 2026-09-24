/* ================= INTERNSHIP DATA ================= */
/*  This array contains sample internship opportunities.
    In a real portal, this information would normally
    come from a database or backend server.  */
const internships = [
    {
        id: 1,
        title: "Web Development Intern",
        company: "TechSolutions",
        category: "Technology",
        duration: "3 Months",
        location: "Remote",
        description:
            "Work on frontend and web development projects."
    },
    {
        id: 2,
        title: "Digital Marketing Intern",
        company: "MarketPro",
        category: "Marketing",
        duration: "2 Months",
        location: "Delhi",
        description:
            "Learn social media marketing and digital campaigns."
    },
    {
        id: 3,
        title: "Finance Intern",
        company: "FinServe",
        category: "Finance",
        duration: "3 Months",
        location: "Mumbai",
        description:
            "Assist with financial analysis and reporting."
    },
    {
        id: 4,
        title: "UI/UX Design Intern",
        company: "CreativeStudio",
        category: "Design",
        duration: "3 Months",
        location: "Remote",
        description:
            "Design user interfaces and improve user experience."
    },
    {
        id: 5,
        title: "JavaScript Developer Intern",
        company: "CodeWorks",
        category: "Technology",
        duration: "4 Months",
        location: "Bangalore",
        description:
            "Work with JavaScript and modern web technologies."
    },
    {
        id: 6,
        title: "Business Marketing Intern",
        company: "GrowthHub",
        category: "Marketing",
        duration: "2 Months",
        location: "Remote",
        description:
            "Assist the marketing team with business campaigns."
    }
];
/* ================= APPLICATION STORAGE ================= */
/*  This array stores applications submitted
    by the student. */
let applications = [];
/* ================= DISPLAY INTERNSHIPS ================= */
/*  This function displays internship cards
    on the webpage. */
function displayInternships(list = internships) {
    const internshipList =
        document.getElementById("internshipList");
    // Clear previous cards
    internshipList.innerHTML = "";
    // If there are no matching internships
    if (list.length === 0) {
        internshipList.innerHTML =
            "<p>No internships found.</p>";
        return;
    }
    // Create a card for every internship
    list.forEach(function(internship) {
        const card =
            document.createElement("div");
        card.className =
            "internship-card";
        card.innerHTML = `
            <h3>
                ${internship.title}
            </h3>
            <p>
                <strong>Company:</strong>
                ${internship.company}
            </p>
            <span class="category">
                ${internship.category}
            </span>
            <p>
                <strong>Duration:</strong>
                ${internship.duration}
            </p>
            <p>
                <strong>Location:</strong>
                ${internship.location}
            </p>
            <p>
                ${internship.description}
            </p>
            <button
                onclick="applyForInternship(${internship.id})"
            >
                Apply Now
            </button>
        `;
        internshipList.appendChild(card);
    });
}
/* ================= APPLY ================= */
/*  This function selects an internship
    for the application form. */
function applyForInternship(id) {
    const internship =
        internships.find(function(item) {
            return item.id === id;
        });
    // Put the selected internship
    // into the application form
    document.getElementById(
        "selectedInternship"
    ).value = internship.title;
    // Scroll to the application form
    document.getElementById(
        "applicationSection"
    ).scrollIntoView({
        behavior: "smooth"
    });
}
/* ================= SEARCH ================= */
/*  This function searches internships
    according to the text entered by the user. */
function searchInternships() {
    const searchText =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();
    const category =
        document.getElementById(
            "categoryFilter"
        ).value;
    const filtered =
        internships.filter(function(internship) {
            const matchesSearch =
                internship.title
                    .toLowerCase()
                    .includes(searchText) ||
                internship.company
                    .toLowerCase()
                    .includes(searchText);
            const matchesCategory =
                category === "all" ||
                internship.category === category;
            return matchesSearch &&
                   matchesCategory;
        });
    displayInternships(filtered);
}
/* ================= EVENT LISTENERS ================= */
// Search when the user types
document.getElementById(
    "searchInput"
).addEventListener(
    "input",
    searchInternships
);
// Filter by category
document.getElementById(
    "categoryFilter"
).addEventListener(
    "change",
    searchInternships
);
/* ================= APPLICATION FORM ================= */
/*   Handle application form submission. */
document.getElementById(
    "applicationForm"
).addEventListener(
    "submit",
    function(event) {
        // Prevent page refresh
        event.preventDefault();
        // Get form values
        const name =
            document.getElementById(
                "studentName"
            ).value;
        const email =
            document.getElementById(
                "studentEmail"
            ).value;
        const internship =
            document.getElementById(
                "selectedInternship"
            ).value;
        const resume =
            document.getElementById(
                "resume"
            ).value;
        // Check whether an internship
        // has been selected
        if (internship === "") {
            document.getElementById(
                "applicationMessage"
            ).textContent =
                "Please select an internship first.";
            return;
        }
        // Create a new application object
        const newApplication = {
            name: name,
            email: email,
            internship: internship,
            resume: resume,
            status: "Application Submitted"
        };
        // Add application to the array
        applications.push(newApplication);
        // Display success message
        const message =
            document.getElementById(
                "applicationMessage"
            );
        message.textContent =
            "Application submitted successfully!";
        message.style.backgroundColor =
            "#d4edda";
        message.style.color =
            "#155724";
        // Clear the form
        document.getElementById(
            "applicationForm"
        ).reset();
        // Display application
        displayApplications();
    }
);
/* ================= TRACK APPLICATIONS ================= */
/*  This function displays all submitted
    internship applications. */
function displayApplications() {
    const applicationList =
        document.getElementById(
            "applicationList"
        );
    applicationList.innerHTML = "";
    // Show message if there are no applications
    if (applications.length === 0) {
        applicationList.innerHTML =
            '<p class="no-application">No applications submitted yet.</p>';
        return;
    }
    // Display every application
    applications.forEach(function(application) {
        const item =
            document.createElement("div");
        item.className =
            "application-item";
        item.innerHTML = `
            <h3>
                ${application.internship}
            </h3>
            <p>
                <strong>Student:</strong>
                ${application.name}
            </p>
            <p>
                <strong>Email:</strong>
                ${application.email}
            </p>
            <p>
                <strong>Resume:</strong>
                ${application.resume}
            </p>
            <span class="status">
                ${application.status}
            </span>
        `;
        applicationList.appendChild(item);
    });
}
/* ================= PAGE LOAD ================= */
// Display internships when the page opens
displayInternships();
// Display applications when the page opens
displayApplications();