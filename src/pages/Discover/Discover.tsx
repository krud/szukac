import React, { useState } from 'react';
import './Discover.css';
import useFetch from 'react-fetch-hook';
import { Data, Item, Search } from '../../services/types';
import { calcThousands, Languages } from '../../services/github.service';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Overview from '../../components/Overview';
import Menu from '../../components/Menu';
import { useHistory } from 'react-router';


export interface DiscoverProps {
    query: string;
}

function Discover({query}: DiscoverProps) {
    const [repos, setRepos] = useState<Item[]>([]);
    const [count, setCount] = useState('');
    const [q, setQ] = useState<Search>({sort: '', language: ''});

    const { isLoading, error } = useFetch(`https://api.github.com/search/repositories?q=${query}${q.language}${q.sort}`, {
        formatter(response: Data): Promise<void> {
            return response.json().then(({items, total_count}) => {
                setRepos(items);
                setCount(calcThousands(total_count));
                return;
            })
        },
        depends: [query, q]
    })

    const history = useHistory();
    
    const routeChange = (item: Item) =>{
        history.push(`${item.owner.login}/${item.name}`, {item});
    }

    const updateLang = (e: string) => {
        setQ({sort: q.sort, language: '+language:' + e})
    }

    const updateQ = (e: Search) => {
        setQ(e);
    }

    return(
        <Container>
            <Row  className="mx-4 my-3">
                <ListGroup as={Col} md={2} className="d-none d-md-flex">
                    <ListGroup.Item className="text-tiny text-uppercase" key={'lg'}> Languages </ListGroup.Item>
                    {Languages.map(l => <ListGroup.Item  className="pointer" action variant="light" onClick={() => updateLang(l.queryId)} key={'lg'+l.name}>
                        {l.name}</ListGroup.Item>)}
                </ListGroup>
                <Col>
                    <Menu total={count} length={repos.length} q={q} query={(l: Search)=>updateQ(l)}/>
                    { isLoading 
                        ?   <Container className="text-center my-5 py-5">
                                <FontAwesomeIcon className="fa-5x fa-spin" icon={faSpinner}/>
                            </Container> 
                        : repos.length > 0 
                            ? <ListGroup>
                                {repos.map(i => (<ListGroup.Item className="pointer" key={i.id} onClick={()=> routeChange(i)}><Overview repo={i}/></ListGroup.Item>))}
                            </ListGroup>
                            : 'Use the Searchbar to Discover Repos'
                        }
                </Col>
            </Row>
        </Container>
    )
};
export default Discover;
