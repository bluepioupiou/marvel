import React, { Component} from 'react';
import md5 from 'js-md5'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

const publicKey = '6234015b1ce8dbc11cb2274c83e2b286'
const privateKey = 'dcd246109083f1b316b680b80c3e3004a9b66524'

class CharactersList extends Component {
  state = {
    'characters': []
  }
  componentDidMount() {
    const ts = Date.now()
    const hash = md5(ts + privateKey + publicKey) 
    fetch('http://gateway.marvel.com/v1/public/characters?limit=20&offset=100&ts=' + ts + '&apikey=' + publicKey + '&hash='+hash)
    .then(response => response.json())
    .then(result => {
      this.setState({ 'characters': result.data.results})
    })

  }
  render() {
    return (
      <div className="App">
        <List>
          {this.state.characters.map(character => (
            <ListItem key={character.id}>
              <ListItemAvatar>
                <Avatar>
                  <img src={character.thumbnail.path + '.' + character.thumbnail.extension} style={{height: 'inherit'}}></img>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={character.name}
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default CharactersList;
