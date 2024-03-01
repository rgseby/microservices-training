import React from "react";

type Prop = {
    comments: Array<string>
}

export default ({ comments }: Prop) => {
    const renderedComments = comments.map(comment => {
        return <li key={(comment as any).id}>{(comment as any).content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
}