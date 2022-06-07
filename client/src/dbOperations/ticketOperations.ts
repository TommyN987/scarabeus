export const addTicket = async (project: string, title: string, description: string, priority: string, submitter: string) => {
  await fetch('http://localhost:5000/dashboard/tickets', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: project,
      ticket: {
        title: title,
        description: description,
        priority: priority,
        submitter: submitter
      }
    })
  });
};

export const updateTicket = async (project: string, title: string, priority: string, status: string, solver: string) => {
  await fetch('http://localhost:5000/dashboard/tickets/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: project,
      ticket: {
        title: title,
        solver: solver,
        priority: priority,
        status: status
      }
    })
  });
};

export const addComment = async (project: string, title: string, commenter: string, message: string) => {
  await fetch('http://localhost:5000/dashboard/tickets/comment', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: project,
      ticket: {
        title: title,
        comment: {
          commenter: commenter,
          message: message
        }
      }
    })
  })
}

export const deleteComment = async (project: string, ticket: string, _id: string) => {
  await fetch('http://localhost:5000/dashboard/tickets/delete', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: project,
      ticketTitle: ticket,
      _id: _id
    })
  })
  console.log(project, ticket, _id)
}