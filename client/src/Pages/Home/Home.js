import React, {useEffect, useState} from "react";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import {Link, useHistory} from 'react-router-dom';

const Home = () => {
    // Get the 'history' object from 'react-router-dom' to handle navigation
    const history = useHistory();
    // State variables to store the list of threads, current page number, and search keyword
    const [threads, setThreads] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    // Fetch threads from the server when the component is mounted
    useEffect(() => {
        getThreads();
    }, []);

    // Function to fetch threads from the server based on the current page number
    const  getThreads = async (pageNumber) => {
        try{
            const {data} = await HttpClient().get('/api/thread', {
                params: { page: pageNumber },
                });
            if (data && data.length) {
                // If threads are fetched, update the threads state, increment the page number, and set hasMore to true
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

    // Function to handle the search input and update the searchKeyword state
    const handleSearch = (event) => {
        setSearchKeyword(event.target.value);
    };
    
    // Filter the threads based on the searchKeyword
    const filteredThreads = threads.filter((thread) =>
        thread.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
            <main className='home'>
                <h1 className="page__title">Home</h1>
                
                <Button className='mb-1' onClick={() => history.push('/thread/create')}>Create a thread</Button>

                <div className="list"> 
                    <input className="search-input" type="text" value={searchKeyword} onChange={handleSearch} placeholder="Search Threads" />
                    {filteredThreads.map((thread, index) => (
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