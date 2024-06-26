const inquirer = require('inquirer')
const fs = require('fs')

const questions = [
    {
    type: "input",
    name: "username",
    message: "What is your Github username? :",
    default: "no @ required",
    validate: function(input) {
        if (input.includes("@")) {
            return `Please enter a valid Github username without the "@" symbol.`;
        }
        if (input.length <=  1) {
            return "Please enter a valid Github username.";
        }
        return true;
    }
},
{
    type: "input",
    name: "email",
    message: "What is your prefered email address? :",
    default: "something@example.com",
    validate: function(email) {
        if (email.includes("@")) {
            return true
        } else {
            return "Please enter a valid email address."
        }
    }
},
{
    type: "input",
    name: "title",
    message: "What is your project's name? :",
    default: "README Generator"
},
{
    type: "input",
    name: "description",
    message: "Give a brief description of your project :",
},
{
    type: "input",
    name: "installation",
    message: "What is the installation process for your project? :",
    default: "npm i"
},
{
    type: "input",
    name: "usage",
    message: "What is the use of your project? :"
},
{
    type: "input",
    name: "contributions",
    message: "What are the contributions for this project? :"
},
{
    type: "input",
    name: "tests",
    message: "If command should be ran to run tests? :",
    default: "npm test"
},
{
    type: "list",
    name: "license",
    message: "Choose a license for this project :",
    choices: [
        "None",
        "Apache License  2.0",
        "GNU General Public License V3.0",
        "MIT",
        "BSD-2",
        "BSD-3",
        "Boost Software  1.0",
        "Creative Commons Zero V1.0 Universal",
        "Eclipse Public  2.0",
        "GNU General Public V3.0",
        "GNU General Public V2.0",
        "GNU Lesser General Public V2.1",
        "Mozilla General V2.0",
        "The Unlicense"
    ]
}

]

inquirer.prompt(questions).then((answers) => {
const readmeContent = generateReadme(answers)
fs.writeFile("README.md", readmeContent, (err) => {
    if (err) throw err
    console.log("README.md has been created!")
})
})

function generateReadme(answers) {
    const sections = [
        "Description",
        "Installation",
        "Usage",
        "Contributions",
        "Tests",
        "Questions",
        "License"
    ];

    let readmeContent = `# ${answers.title}\n\n`;

    readmeContent += `## Table of Contents\n\n`;
    sections.forEach(section => {
        readmeContent += `* [${section}](#${section.toLowerCase().replace(/ /g, '-')})\n`;
    });
    readmeContent += `\n`;

    sections.forEach(section => {
        if (section === "Questions") {
            readmeContent += `## ${section}\n\n If you have any questions, contact me here: \n\n`;
            if (answers.username) {
                readmeContent += `* [GitHub Profile](https://github.com/${answers.username})\n`;
            }
            if (answers.email) {
                readmeContent += `* Email: ${answers.email}\n`;
            }
            readmeContent += `\n`;
        } else if (answers[section.toLowerCase()]) {
            readmeContent += `## ${section}\n\n${answers[section.toLowerCase()]}\n\n`;
        }
    });


    return readmeContent;
}