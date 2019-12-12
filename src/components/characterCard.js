import React from 'react';
import { useParams } from 'react-router-dom'

import useFetchMarvel from '../hooks/useFetchMarvel'

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
  const { id } = useParams()
  const [ characters, loading ] =  useFetchMarvel('characters/' + id + '?')
  let character
  if (!loading) {
    character = characters[0]
  }
  
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
            <div>
              available in {character.comics.available} comics such as
              <List>
                {character.comics.items.splice(0,3).map(comic => (
                  <ListItem  key={comic.resourceURI}>
                    <ListItemText primary={comic.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          </CardContent>
          
        </Card>
        )
      }
    </>
  )
}
