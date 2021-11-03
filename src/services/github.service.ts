import { count } from 'console';
import { Language } from './types';

export const Languages: Array<Language> = [
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

export const calcThousands = (count: number) => {
    return count >= 1000 ? ( count / 1000).toFixed(1) + 'K' : count.toString();
}