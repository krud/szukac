import React from 'react';
import './Block.css';
import { Container, Col, Row, Badge } from 'react-bootstrap';

export interface BlockProps {
    content : {
      image: { URL: string; name: string; };
      column: {masthead: string; body: string;}
    }
};

function Block({content: {image, column}}: BlockProps) {
    return(
        <Container fluid>
            <Row className="flex-column-reverse flex-md-row vh-50">
                <Col sm={12} md={8} lg={4} className="m-auto py-5 my-5 align-self-center">
                    <div className="my-4">
                        <h1>{column.masthead}</h1>
                        <h5>{column.body}</h5>
                    </div>
                </Col>
                <Col md={12} lg={6} className="bg-img px-0" style={{backgroundImage: `url(${image.URL})`}}></Col>
            </Row>
        </Container>
    )
};
export default Block;
