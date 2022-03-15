import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    artistList: {
        width: "250px"
    }
})


const ArtistsList = ({data}) => {
    const classes = useStyles()
    const artists = []
    for(var artist in data) {
        artists.push([artist, artist[artist]])
    }

    return (
        <div className={classes.artistList}>
            {artists.map((name) => (
                <div key={name}>
                    <li>{name}</li>
                </div>
            ))}

        </div>
    )
}
export default ArtistsList;