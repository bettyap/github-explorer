import React, { useState, useEffect} from 'react';

import api from '../../services/api';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Link, useRouteMatch } from 'react-router-dom';

import Logo from '../../img/logo-github.svg';

import { Header, RepositoryInfo, Issues } from './style';

interface RepositoryParams{
  repository: string
}

interface Repository {
  full_name: string,
  description: string,
  forks_count: number,
  stargazers_count: number,
  open_issues_count: number,
  owner: {
    login: string,
    avatar_url: string
  }
}

interface Issue{
  id: number,
  title: string,
  html_url: string,
  user: {
    login: string,
  }

}

const Repository: React.FC = () => {
  const [ repository, setRepository ] = useState<Repository | null >(null)
  const [ issues, setIssues ] = useState<Issue[]>([])
  const { params } = useRouteMatch<RepositoryParams>()

  useEffect(() => {

    api.get(`repos/${params.repository}`).then(
      response => {
        console.log(response.data)
        setRepository(response.data)
      }
    )

    api.get(`repos/${params.repository}/issues`).then(
      response => {
        console.log(response.data)
        setIssues(response.data)
      }
    )

  }, [params.repository] )

  return (
    <>
    <Header>
      <img src={Logo} alt="Logo App" />
      <Link to="/">
          <FiChevronLeft size={20} /> Voltar
      </Link>
    </Header>
    { repository && (
       <RepositoryInfo>
       <header>
         <img 
           src={repository.owner.avatar_url} 
           alt={repository.full_name} 
          />
         <div>
           <strong>{repository.full_name}</strong>
           <p>{repository.description}</p>
         </div>
       </header>
       <ul>
         <li>
           <strong>{repository.stargazers_count}</strong>
           <span>Starts</span>
         </li>
         <li>
           <strong>{repository.forks_count}</strong>
           <span>Forks</span>
         </li>
         <li>
           <strong>{repository.open_issues_count}</strong>
           <span>Issues abertas</span>
         </li>
       </ul>
     </RepositoryInfo>
    )}
   
    <Issues>
      { issues.map( issue => (
        <a key={issue.id} href={issue.html_url} target="_blank">
        <div>
          <strong>{issue.title}</strong>
          <p>{issue.user.login}</p>
        </div>
        <FiChevronRight size={40}/>
      </a>
      ))}
    </Issues>
    
    </>
  );
}

export default Repository;