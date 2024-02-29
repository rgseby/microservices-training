import React, { useState } from "react";
import axios from "axios";

type Prop = {
    postId?: string
}

export default ({ postId }: Prop) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        });

        setContent('');
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New comment</label>
                <input value={content} onChange={e => setContent(e.target.value)} className="form-control"/>
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}