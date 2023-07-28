import React, {useEffect, useState} from "react";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import {Link, useHistory} from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        getThreads();
    }, []);

    const  getThreads = async () => {
        const {data} = await HttpClient().get('/api/thread');
        setThreads(data);
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
                
            </main>
        </>
    );
};

export default Home;