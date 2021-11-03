import { Query } from './types';

export const Languages: Array<Query> = [
    {name: 'JavaScript', queryId: 'javascript'},
    {name: 'Java', queryId: 'java'},
    {name: 'CSS', queryId: 'CSS'},
    {name: 'Python', queryId: 'python'},
    {name: 'HTML', queryId: 'HTML'},
    {name: 'C#', queryId: 'C%23'},
    {name: 'PHP', queryId: 'PHP'},
    {name: 'Ruby', queryId: 'ruby'},
    {name: 'C++', queryId: 'C%2B%2B'},
    {name: 'TypeScript', queryId: 'typescript',},
]

export const Sort: Array<Query> = [
    {name: 'Best Match', queryId: ''},
    {name: 'Most Stars', queryId: '&sort=stars'},
    {name: 'Fewest Stars', queryId: '&sort=stars-asc'},
]

export const calcThousands = (count: number) => {
    return count >= 1000 ? ( count / 1000).toFixed(1) + 'K' : count.toString();
}