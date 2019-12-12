import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import md5 from 'js-md5'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const publicKey = '6234015b1ce8dbc11cb2274c83e2b286'
const privateKey = 'dcd246109083f1b316b680b80c3e3004a9b66524'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    backgroundSize: 'contain'
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  }
});

export default function CharacterCard () {
  const classes = useStyles()
  const [character, setCharacter] = useState()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      const ts = Date.now()
      const hash = md5(ts + privateKey + publicKey) 
      const response = await fetch('http://gateway.marvel.com/v1/public/characters/' + id + '?ts=' + ts + '&apikey=' + publicKey + '&hash='+hash)
      const result = await response.json()
      setCharacter(result.data.results[0])
      setLoading(false)
    }
    setLoading(true)
    fetchData()
  }, [id])
  
  return (
    <>
      {loading ? 
        <CircularProgress />
      : 
        (<Card className={classes.card}>
          <CardActions>
              <Button size="small" component={Link} to='/' >
                <ArrowBackIcon />
                Back to list
              </Button>
          </CardActions>
          <CardMedia
            className={classes.media}
            image={character.thumbnail.path + '.' + character.thumbnail.extension}
            title={character.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {character.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {character.description}<br/>
              
            </Typography>
            <Divider  variant="middle" className={classes.divider}/>
            <Typography variant="body2" color="textSecondary" component="p">
              available in {character.comics.available} comics such as
            <List>
              {character.comics.items.splice(0,3).map(comic => (
                <ListItem  key={comic.resourceURI}>
                  <ListItemText primary={comic.name} />
                </ListItem>
              ))}
            </List>
            </Typography>
          </CardContent>
          
        </Card>
        )
      }
    </>
  )
}
