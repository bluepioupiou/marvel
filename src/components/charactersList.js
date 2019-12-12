import React, { useEffect, useState } from 'react';
import md5 from 'js-md5'

import { Link } from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';


const publicKey = '6234015b1ce8dbc11cb2274c83e2b286'
const privateKey = 'dcd246109083f1b316b680b80c3e3004a9b66524'

export default () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const ts = Date.now()
      const hash = md5(ts + privateKey + publicKey) 
      const response = await fetch('http://gateway.marvel.com/v1/public/characters?limit=20&offset=100&ts=' + ts + '&apikey=' + publicKey + '&hash='+hash)
      const result = await response.json()
      setCharacters(result.data.results)
      setLoading(false)
    }
    setLoading(true)
    fetchData()
  }, [])
  
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