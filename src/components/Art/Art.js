import "./Art.css"
import ArtData from "../../ArtData"

const Art = () => {
    return (
      <div>
        <h1 className="mainTitle">Art</h1>
            <ul>
             { ArtData.map((piece) => {
                return(
                    <div>
                        <div className="artContainer">
                            <img src={piece.image1} className="image1"></img>
                            <div className="descriptionContainer">
                                <h2 className="artTitle">Title: {piece.title}</h2>
                                <h3>Date: {piece.date}</h3>
                                <h3>Dimensions: {piece.dimensions}</h3>
                                <h3>Medium: {piece.medium}</h3>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                )})}
            </ul>
      </div>
    );
};
  export default Art;