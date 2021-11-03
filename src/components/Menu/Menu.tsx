import React, { useState } from 'react';
import './Menu.css';
import { Form, Row, Col } from 'react-bootstrap';
import { Search} from '../../services/types';
import { Languages, Sort } from '../../services/github.service';

export interface MenuProps {
    query?: any;
    length?: number;
    total?: string;
    lang?: string;
    fil?: string;
    q: Search;
}

function Menu({ length, total, query, q }: MenuProps) {
    const [language, setLanguage] = useState(q.language);
    const [sort, setSort] = useState(q.sort);

    const updateSort = (e: any) => {
        setSort(e.target.value);
        query({sort: e.target.value, language: language});
    };
    
    const updateLanguage = (e: any) => {
        setLanguage('+language:' + e.target.value);
        query({sort: sort, language: '+language:' + e.target.value});
    };

    return(
        <Row className="justify-content-between align-items-center flex-md-row-reverse mb-3">
            <Col md={4} className="mb-0 text-uppercase text-tiny align-items-center">
                <Form.Group as={Row} controlId="formLang" className="d-md-none mb-3">
                    <Form.Label column sm="2">Language</Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="FilterLanguage" size="sm" onChange={updateLanguage}>
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
                {total !== '' ? <>1 - {length} of {total} <span className="d-none d-md-inline">Repository Results</span></>: <></>}
            </Col>
        </Row>
    );
}
export default Menu;
