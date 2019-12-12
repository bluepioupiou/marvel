import React from 'react';
import useFetchMarvel from '../hooks/useFetchMarvel'

import { Link } from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';


export default () => {
  const [ characters, loading ] =  useFetchMarvel('characters?limit=20&offset=100')
  return (
    <div className="App">
      <h1>Welcome to the Marvelous list</h1>
      {loading ? 
        <CircularProgress />
      : 
        (<List>
          {characters.map(character => (
            <ListItem key={character.id}>
              <ListItemAvatar>
                <Avatar>
                  <img src={character.thumbnail.path + '.' + character.thumbnail.extension} alt={character.name} style={{height: 'inherit'}}></img>
                </Avatar>
              </ListItemAvatar>
              <Link to={'/characters/' + character.id}>
                <ListItemText
                  primary={character.name}
                />
              </Link>              
            </ListItem>
          ))}
        </List>)
      }
    </div>
  )
}