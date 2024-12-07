const childForm = document.getElementById("childForm");
const searchButton = document.getElementById("searchButton");
const searchNumber = document.getElementById("searchNumber");

const children = {}; // Store child data with enrollment numbers as keys

// Add child details on form submission
childForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const enrollment = e.target.enrollment.value.trim();
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    const address = e.target.address.value.trim();

    // Check for duplicate enrollment numbers
    if (children[enrollment]) {
        alert("Enrollment number already exists. Please use a unique number.");
        return;
    }

    // Save the child's details
    children[enrollment] = { name, phone, address };
    alert(`Child added successfully with enrollment number: ${enrollment}`);
    
    // Reset the form
    e.target.reset();
});

// Search and open child details as a CV
searchButton.addEventListener("click", () => {
    const enrollment = searchNumber.value.trim();

    if (children[enrollment]) {
        const { name, phone, address } = children[enrollment];

        // Open a new tab with the CV
        const newTab = window.open("", "_blank");
        newTab.document.write(`
            <html>
            <head>
                <title>${name}'s CV</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(to right, #4facfe, #00f2fe);
                        color: white;
                        padding: 20px;
                        margin: 0;
                        box-sizing: border-box;
                    }
                    .cv-container {
                        max-width: 600px;
                        margin: auto;
                        background: white;
                        color: black;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #4facfe;
                        font-size: 2rem;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 1rem;
                        margin: 8px 0;
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    <h1>${name}'s CV</h1>
                    <p><strong>Enrollment Number:</strong> ${enrollment}</p>
                    <p><strong>Phone Number:</strong> ${phone}</p>
                    <p><strong>Address:</strong> ${address}</p>
                </div>
            </body>
            </html>
        `);
    } else {
        alert("No child found with the provided enrollment number.");
    }
});
