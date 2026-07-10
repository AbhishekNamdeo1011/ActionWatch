import { createTransporter } from "../config/mail.js";

import { assignmentTemplate } from "../templates/assignment.template.js";

export const sendAssignmentEmail = async (

    user,

    incident

) => {

    const transporter =

        await createTransporter();

    await transporter.sendMail({

        from: `"ActionWatch" <${process.env.EMAIL_USER}>`,

        to: user.email,

        subject: `🚨 Incident Assigned - ${incident.title}`,

        html: assignmentTemplate(

            user,

            incident

        ),

    });

    console.log(

        "✅ Assignment email sent"

    );

};