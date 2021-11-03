import React, {useState} from 'react';
import './Detail.css';
import { Data, Item } from '../../services/types';
import { calcThousands } from '../../services/github.service';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import { Container, Row, Badge } from 'react-bootstrap';
import Block from '../../components/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Overview from '../../components/Overview';

export interface DetailProps {}

function Detail() {
    const { user, name } = useParams<{ user: string, name: string }>();
    const [item, setItem] = useState<Item>();

    const { isLoading, error } = useFetch(`https://api.github.com/search/repositories?q=repo:${user}/${name}`, {
        formatter(response: Data): Promise<void> {
          return response.json().then((response) => {
            setItem(response.items[0]);
            return;
          })
        }
      });

    const notFound = {
          column: {masthead: '', body: ''},
          image: {name: 'not-found', URL: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80'}
      }

    return( 
        <Container className="my-4 px-4" fluid>
            { item?.id 
                ? <>
                    <Overview repo={item}/>
                    <Row>
                        <span className="w-fit"><FontAwesomeIcon className="me-1" icon={faEye}/>{calcThousands(item.watchers_count)}</span>
                        <span className="w-fit"><FontAwesomeIcon className="me-1" icon={faStar}/>{calcThousands(item.stargazers_count)}</span>
                        <span className="w-fit"><FontAwesomeIcon className="me-1" icon={faCodeBranch}/>{calcThousands(item.forks_count)}</span>
                        <Badge bg="light" className="w-fit d-flex text-capitalize ms-2 text-black-50 rounded">{item.private ? 'Private' : 'Public'}</Badge>
                    </Row>
                    <Row>
                        {item.topics.map(topic => <Badge bg="light" key={`tag-${topic}`} className="w-fit d-flex text-capitalize ms-2 text-black-50 rounded">{topic}</Badge>)}
                    </Row>
                </>
            : <Block content={notFound}></Block>
            }
      </Container>
    );
};
export default Detail;