export const assignmentTemplate = (

    user,

    incident 

) => {

    return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

</head>

<body style="font-family:Arial;background:#f5f7fb;padding:40px;">

<div
style="
max-width:700px;
margin:auto;
background:white;
border-radius:10px;
padding:30px;
">

<h2 style="color:#ef4444;">

🚨 New Incident Assigned

</h2>

<p>

Hello <strong>${user.username}</strong>,

</p>

<p>

A new production incident has been assigned to you.

</p>

<hr>

<p>

<b>Title:</b>

${incident.title}

</p>

<p>

<b>Severity:</b>

${incident.severity}

</p>

<p>

<b>Service:</b>

${incident.service}

</p>

<p>

<b>Description:</b>

${incident.description}

</p>

<p>

<b>Status:</b>

${incident.status}

</p>

<hr>

<p>

Please investigate immediately.

</p>

<p>

Regards,

<br>

ActionWatch

</p>

</div>

</body>

</html>

`;

};