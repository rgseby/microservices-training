import React, { useState, useEffect } from "react";
import axios from "axios";

type Prop = {
    postId?: string
}

export default ({ postId }: Prop) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map(comment => {
        return <li key={(comment as any).id}>{(comment as any).content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
}