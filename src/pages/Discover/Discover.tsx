import React, { useState } from 'react';
import './Discover.css';
import useFetch from 'react-fetch-hook';
import { Data, Item } from '../../services/types';
import { calcThousands } from '../../services/github.service';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Overview from '../../components/Overview';


export interface DiscoverProps {
    query: string;
}

function Discover({query}: DiscoverProps) {
    const [repos, setRepos] = useState<Item[]>([]);
    const [count, setCount] = useState('');
    const [language, setLanguage] = useState('');
    const [sort, setSort] = useState('');

    const { isLoading, error } = useFetch(`https://api.github.com/search/repositories?q=${query}${language}${sort}`, {
        formatter(response: Data): Promise<void> {
            return response.json().then(({items, total_count}) => {
                setRepos(items);
                setCount(calcThousands(total_count));
                return;
            })
        },
        depends: [query]
    })
    return(
        <Container>
            <Row>
                <Col>
                { isLoading 
                    ?   <Container className="text-center my-5 py-5">
                            <FontAwesomeIcon className="fa-5x fa-spin" icon={faSpinner}/>
                        </Container> 
                    : repos.length > 0 
                        ? <ListGroup>
                            {repos.map(i => (<ListGroup.Item key={i.id}><Overview/></ListGroup.Item>))}
                        </ListGroup>
                        : 'Use the Searchbar to Discover Repos'
                    }
                </Col>
            </Row>
        </Container>
    )
};
export default Discover;
