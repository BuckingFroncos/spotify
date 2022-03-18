import '../index.css'

const ArtistsList = ({data}) => {
    const dataset = {};
    let arrLength = 0;
    for(var name in data){
        console.log(name)
        console.log(data[name][1][0])
        arrLength = data[name][1].length;
        if (arrLength > 0){
            console.log(data[name][1][0]['url'])
            dataset[name] = data[name][1][0]['url']
        }
        else{
            dataset[name] = "No Image Available"
        }
    }

    return (
        <div className="artistList">
            {Object.entries(dataset).map(([name, url]) => (
                <div className="artist" key={name,url}>
                    <img className="artist-pic" src={url} alt={url}/>
                    <li>{name}</li>
                </div>
            ))}

        </div>
    )
}
export default ArtistsList;