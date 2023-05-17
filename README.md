# employee-tracker
Challenge #12

## Task
- AS A business owner, I WANT to be able to view and manage the departments, roles, and employees in my company, SO THAT I can organize and plan my business.
- GIVEN a command-line application that accepts user input WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Process
- Install the dependencies we need to run the code - inquirer, mysql, CTable.
- Connect node to the SQL database using a mysql connection.
- Define and build functions for each type of database query (view, add, update).
- Use the inquirer package to create a stringed prompt that asks the users for input.
- Combine queries and prompt answers to render and return a formatted table with requested data.

## What I Learned
- I learned what dependencies I need to complete the project.
- I learned how to connect node to an SQL database and use queries to access that database.
- I learned how to create an inquirer prompt that can jump to certain questions depending on previous answers.
- I learned how to really format and SQL table.

## Link to video demo: https://drive.google.com/file/d/1pe4GhWNg58msvWOyAgg6rJRl0nqoETnV/view

## Screenshots:
### Prompt
![Screenshot 2023-05-17 at 1 25 47 PM](https://github.com/bigcat86/employee-tracker/assets/122062578/ffe004da-87b9-47d9-835a-ea030fb1da86)
### Employee Table
![Screenshot 2023-05-17 at 1 24 42 PM](https://github.com/bigcat86/employee-tracker/assets/122062578/6e34262f-1a60-43bd-994c-24ff2706c8ae)
