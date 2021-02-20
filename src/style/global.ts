import { createGlobalStyle } from 'styled-components';

import GitHubImage from '../img/github-background.svg';

export default createGlobalStyle `
*{
    margin: 0px;
    padding: 0px;
    outline: 0px;
    box-sizing: border-box;
}
body{
    background: #f0f0f5 url(${GitHubImage}) no-repeat 70% top;
}

body, input, button{
    font: 16px Roboto, sans-serif;
}

#root{
    max-width: 968px;
    margin: 0 auto;
    padding: 40px 20px;
}

button{
    cursor: pointer
}
`