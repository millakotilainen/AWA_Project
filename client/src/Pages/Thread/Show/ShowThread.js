import React, { useContext, useEffect, useState } from "react";
import {useParams, useHistory, Link} from 'react-router-dom';
import HttpClient from "../../../Services/HttpClient";
import AppContext from "../../../Contexts/AppContext";
//import Button from "../../../Components/Button/Button";
import { List, ListItem, ListItemText, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
 

export default function(){
    const history = useHistory();
    const {user} = useContext(AppContext);
    const {id} = useParams();
    const [thread, setThread] = useState(null);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    useEffect(() => {
        setThread(null);
        //setComments([]);
        getThread();
        getCommentsFromLocalStorage();
    }, [id]);

    const getThread = async () => {
        const {data} = await HttpClient().get('/api/thread/'+id);
        setThread(data);
        getComments();
    }

    const getComments = async () => {
        const {data} = await HttpClient().get('/api/comment/thread/'+id);
        if(data.data.length){
            //setComments(data);
            setComments([...comments, ...data.data]);
            setPage(page + 1);
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }

    const getCommentsFromLocalStorage = () => {
        const storedComments = localStorage.getItem('comments');
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        }
    };

    const handleReply = async event => {
        event.preventDefault();

        if(!replyContent) return;
        const data = {
            author: user._id,
            threadId: thread._id,
            comment: replyContent,
        };

        const response = await HttpClient().post("/api/comment/create", data);
        //setComments([...comments, response.data]);
        const updatedComments = [...comments, response.data];
        setComments(updatedComments);
        saveCommentsToLocalStorage(updatedComments);

    };

    const saveCommentsToLocalStorage = (comments) => {
        localStorage.setItem('comments', JSON.stringify(comments));
    };
    
    

    return(
        <div className="page">
            {thread && <h1 className="page__title">{thread.title}</h1>}
            {thread && <p className="page__author">Thread by: {(thread.author && thread.author.name) || "No name"}</p>}
            {thread && <p className="page__description">{thread.description}</p>}

            <List>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={comment.comment} secondary={comment.createdAt}/>
                    </ListItem>
                    
                ))}
            </List>

            <Button variant="contained" color="primary" disabled={!hasMore} onClick={getComments}>Load more comments</Button>
            {user && <Button variant="contained" color="primary" onClick={() => setIsReplying(true)}>Reply</Button>}
            {isReplying && (
                <form onSubmit={handleReply}>
                    <TextField fullWidth label="Content" value={replyContent} onChange={e => setReplyContent(e.target.value)}/>
                    <Button type="submit">Reply</Button>
                </form>
            )}
            
        </div>
    )
}