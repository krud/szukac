import React, { useState } from 'react';
import './Discover.css';
import useFetch from 'react-fetch-hook';
import { Data, Item } from '../../services/types';
import { calcThousands, Languages, Sort } from '../../services/github.service';
import { Container, Col, Form, Row, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Overview from '../../components/Overview';
import { useHistory } from 'react-router';


export interface DiscoverProps {
    query: string;
}

function Discover({query}: DiscoverProps) {
    const [repos, setRepos] = useState<Item[]>([]);
    const [count, setCount] = useState('');
    const [language, setLanguage] = useState('');
    const [sort, setSort] = useState('');

    const { isLoading } = useFetch(`https://api.github.com/search/repositories?q=${query}+language:${language}${sort}`, {
        formatter(response: Data): Promise<void> {
            return response.json().then(({items, total_count}) => {
                setRepos(items);
                setCount(calcThousands(total_count));
                return;
            })
        },
        depends: [query]
    })

    const history = useHistory();
    
    const routeChange = (item: Item) =>{
        history.push(`${item.owner.login}/${item.name}`, {item});
    }

    const updateSort = (e: any) => {
        setSort(e.target.value);
    };
    
    const updateLanguage = (e: any) => {
        setLanguage(e.target.value);
    };
    const updateLang = (e: string) => {
        setLanguage(e);
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
                    <Row className="justify-content-between align-items-center flex-md-row-reverse mb-3">
                        <Col md={4} className="mb-0 text-uppercase text-tiny align-items-center">
                            <Form.Group as={Row} controlId="formLang" className="d-md-none mb-3">
                                <Form.Label column sm="2">Language</Form.Label>
                                <Col sm="10">
                                    <Form.Select aria-label="FilterLanguage" size="sm" value={language} onChange={updateLanguage}>
                                        {Languages.map(l => <option value={l.queryId} key={'lg'+l.queryId}>{l.name}</option>)}
                                        <option value="">All</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formSort">
                                <Form.Label column sm="2" className="d-md-none">Sort</Form.Label>
                                <Col sm={10} md={12}>
                                    <Form.Select aria-label="Sort" size="sm" onChange={updateSort}>
                                        {Sort.map(s => <option value={s.queryId} key={'sort'+s.queryId}>{s.name}</option>)}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col className="mt-2 mt-md-0">
                            {count !== '' ? <>1 - {repos.length} of {count} <span className="d-none d-md-inline">Repository Results</span></>: <></>}
                        </Col>
                    </Row>
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
