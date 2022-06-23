# SCARABEUS: Bug Tracker

## A MERN stack application

Scarabeus is an issue tracker / bug tracker application built with React and TypeScript on the front end, Node.js and Express on the back end, MongoDB as database and Firebase for authentication. I utilized the Material UI library for the application's styling, and the Chart.js library for the charts on the dashboard's landing page.

![login](https://user-images.githubusercontent.com/96293671/175386441-887c55bf-4174-4199-b9a4-1c633b923a2b.png)

### ROLE ASSIGNMENT

There are four possible roles in the application (Admin, Project Manager, Developer, Submitter), each having its own set of possible actions they can make. Only Admin can edit the other users' roles, Project Manager can assign personnel to projects and has full editing access to all tickets of their projects. Developer can partially edit tickets, while Submitter can only submit and comment on tickets.

![users](https://user-images.githubusercontent.com/96293671/175389247-41834fb6-03d9-4093-9a90-76b432edd4fe.png)

### PROJECTS

Projects are the highest-level unit of the application. Each project has a title, a description, assigned personnel, and tickets.

![projects](https://user-images.githubusercontent.com/96293671/175389339-8aa73c66-f15b-4644-af73-e86512284b48.png)

### TICKETS

Tickets belong to projects. Every ticket has a submitter, a solver (assigned by either Admin or the project's Project Manager), a priority (set by Submitter, but editable by Admin and PM), a status (Open, In Process, Closed - editable by the assigned solver as well) and a comment section.

![tickets](https://user-images.githubusercontent.com/96293671/175389518-667513e3-2cf4-42b9-a889-dc48f2b51478.png)

![ticket](https://user-images.githubusercontent.com/96293671/175389640-d9f61e6a-a8c9-43a1-baa0-331b9853a6b6.png)
