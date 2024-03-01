import React from "react";

type Prop = {
    comments: Array<string>
}

export default ({ comments }: Prop) => {
    const renderedComments = comments.map(comment => {
        let content;

        switch ((comment as any).status) {

            case 'approved': {
                content = (comment as any).content;
                break;
            }

            case 'pending': {
                content = 'This comment is awaiting moderation.';
                break;
            }

            case 'rejected': {
                content = 'This comment was rejected.';
                break;
            }
        }

        return <li key={(comment as any).id}>{content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
}