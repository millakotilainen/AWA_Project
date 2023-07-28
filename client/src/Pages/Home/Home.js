import React, {useEffect, useState} from "react";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import {Link, useHistory} from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const [threads, setThreads] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        getThreads();
    }, []);

    const  getThreads = async (pageNumber) => {
        try{
            const {data} = await HttpClient().get('/api/thread', {
                params: { page: pageNumber },
                });
            if (data && data.length) {
                setThreads([...threads, ...data]);
                setPage(page + 1);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoadMoreThreads = () => {
        getThreads(page);
    };

    return (
        <>
            <main className='home'>
                <h1 className="page__title">Home</h1>
                
                <Button className='mb-1' onClick={() => history.push('/thread/create')}>Create a thread</Button>

                <div className="list"> 
                    {threads.map((thread, index) => (
                        <div className="list__item" key={index}>
                            <Link to={`/thread/${thread._id}`} className="list__link"> {thread.title} </Link>
                        </div>
                    ))}
                </div>
                <Button variant="contained" color="primary" disabled={!hasMore} onClick={handleLoadMoreThreads}>Load more threads</Button>
            </main>
        </>
    );
};

export default Home;