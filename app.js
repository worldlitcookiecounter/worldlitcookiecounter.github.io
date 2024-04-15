document.addEventListener('DOMContentLoaded', function () {
    // Load initial rankings and display total cookies
    displayRankings();
    displayTotalCookies();
    displayCookiesGivenLastClass();
});

function displayRankings() {
    // Display rankings
    var rankingsContainer = document.getElementById('cookieRankings');
    var rankingsList = document.createElement('ol');

    var students = getInitialData(); // Get initial student data

    // Get the top students
    var topStudents = getTopStudents(students, 3);

    // Display the top students on a podium
    topStudents.forEach(function (student, index) {
        var podiumItem = document.createElement('li');
        podiumItem.textContent = student.name + ': ' + student.cookies;
        podiumItem.classList.add('podium-' + (index + 1)); // Add podium class (1, 2, 3)
        rankingsList.appendChild(podiumItem);
    });

    // Display the remaining students
    Object.keys(students).forEach(function (student) {
        if (!topStudents.find(topStudent => topStudent.name === student)) {
            var listItem = document.createElement('li');
            listItem.textContent = student + ': ' + students[student];
            rankingsList.appendChild(listItem);
        }
    });

    rankingsContainer.appendChild(rankingsList);
}

function getTopStudents(students, count) {
    // Get the top students (considering ties)
    var sortedStudents = Object.keys(students).sort((a, b) => students[b] - students[a]);
    var topStudents = [];

    for (var i = 0; i < count; i++) {
        var studentName = sortedStudents[i];
        var studentCookies = students[studentName];
        
        // Check for ties and include all tied students
        var tiedStudents = sortedStudents.filter(name => students[name] === studentCookies);

        // Create an object for each tied student
        tiedStudents.forEach(function (tiedStudent) {
            topStudents.push({ name: tiedStudent, cookies: studentCookies });
        });

        // Skip the next students in case of ties
        i += tiedStudents.length - 1;
    }

    return topStudents;
}

function displayTotalCookies() {
    // Display total cookies
    var totalCookiesContainer = document.getElementById('totalCookies');
    var students = getInitialData(); // Get initial student data

    // Calculate total cookies
    var totalCookies = Object.values(students).reduce((total, count) => total + count, 0);

    var totalCookiesText = document.createElement('p');
    totalCookiesText.textContent = 'Total Cookies: ' + totalCookies;
    
    totalCookiesContainer.appendChild(totalCookiesText);
}

function displayCookiesGivenLastClass() {
    // Display cookies given last class
    var cookiesGivenContainer = document.getElementById('cookiesGivenLastClass');
    var cookiesGivenText = document.createElement('p');

    // Set the value based on your data or update dynamically
    var cookiesGivenLastClass = 2;

    cookiesGivenText.textContent = 'Cookies Given Last Class: ' + cookiesGivenLastClass;
    cookiesGivenContainer.appendChild(cookiesGivenText);
}

// Function to get initial student data
function getInitialData() {
    return {
        "Rafael Bustillo": 7,
        "Duncan Troup": 5,
        "Landon Langley": 4,
        "Lexi Aikman": 2,
        "Kennedy Johnson": 2,
        "Rachel Forsythe": 2,
        "Ashton Price": 2,
        "Kennedy McGuire": 1.8,
        "Angela": 1,
        "Sierra Hoss": 1,
        "Benjamin Kelley": 1,
        "Jaycie Jobe": 1,
        "Jameson Tankersley": 1,
        "Ella Brinkley": 1,
        "Elise Henderson": 1,
        "Reece Gray": 1,
        "Tristan Richert": 1,
        "Grace Sexton": 1,
        "Hannah Mathews": 1,
    };
}
