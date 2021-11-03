import React from 'react';
import { Item } from '../../services/types';
import { calcThousands } from '../../services/github.service';
import { Container, Col, Row, ListGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Overview.css';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export interface OverviewProps {
    repo: Item;
};

function Overview({repo}: OverviewProps) {
    const count = calcThousands(repo.stargazers_count);

    return(
        <Row className="align-items-center">
            <Col sm={3} md={2} lg={1}>
                <img className="w-100" src={repo.owner.avatar_url} alt={repo.owner.login}/>
            </Col>
            <Col sm={9} md={10} lg={11}>
                <Row className="align-items-center">
                    <Col sm={12} md={8} lg={9}>
                        <h5 className="mb-0">{repo.full_name}</h5>
                        <h5 className="mb-0 text-tiny">{repo.description}</h5>
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                        <div className="d-inline-flex align-item-center mt-2 mt-md-0">
                            <span><FontAwesomeIcon className="me-1" icon={faStar}/> {count}</span>
                            <Badge bg="light" className="ms-2 text-black-50 rounded">{repo.language}</Badge>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};
export default Overview;
