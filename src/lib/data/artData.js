/**
 * @typedef {{
 *   id: string,
 *   image: string,
 *   title: string,
 *   date: string,
 *   dimensions: string,
 *   medium: string,
 * }} ArtPiece
 */

/** @type {ArtPiece[]} */
const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, '')}`

/** @type {ArtPiece[]} */
const artData = [
  { id: "Room", image: assetUrl("/Art/Room.png"), title: "Room", date: "2021", dimensions: '16" x 20"', medium: "Acrylic on Canvas" },
  { id: "StillLife", image: assetUrl("/Art/StillLife.png"), title: "Still Life", date: "", dimensions: '12" x 16"', medium: "Acrylic on Canvas" },
  { id: "Reach", image: assetUrl("/Art/Reach.png"), title: "Reach", date: "2021", dimensions: '12" x 16"', medium: "Acrylic on Canvas" },
  { id: "Suppression", image: assetUrl("/Art/Suppression.png"), title: "Suppression", date: "2022", dimensions: '16" x 20"', medium: "Acrylic on Canvas" },
  { id: "Untitled", image: assetUrl("/Art/Untitled.png"), title: "Untitled", date: "2021", dimensions: '12" x 16"', medium: "Acrylic on Canvas" },
  { id: "Flowers", image: assetUrl("/Art/Flowers.png"), title: "Flowers", date: "2021", dimensions: '12" x 16"', medium: "" },
  { id: "Ocean", image: assetUrl("/Art/Ocean.png"), title: "Ocean", date: "2022", dimensions: '16" x 20"', medium: "Acrylic on Canvas" },
  { id: "Landscape", image: assetUrl("/Art/Landscape.png"), title: "Landscape", date: "2022", dimensions: '16" x 20"', medium: "Acrylic on Canvas" },
  { id: "SalvationI", image: assetUrl("/Art/SalvationI.png"), title: "Salvation I", date: "2022", dimensions: '12" x 16"', medium: "Acrylic on Canvas" },
  { id: "AbsurdGarden", image: assetUrl("/Art/AbsurdGarden.png"), title: "Untitled", date: "2022", dimensions: '18" x 24"', medium: "Acrylic on Canvas" },
  { id: "Series", image: assetUrl("/Art/Series.png"), title: "Paper Over Time", date: "2020", dimensions: "N/A", medium: "Photography" },
  { id: "TheGarden", image: assetUrl("/Art/TheGarden.png"), title: "The Garden", date: "2022", dimensions: '41" x 35"', medium: "Gesso, pen, and pencil on paper" },
  { id: "SelfPortrait", image: assetUrl("/Art/SelfPortrait.png"), title: "Self Portrait", date: "2022", dimensions: '12" x 16"', medium: "Acrylic on Canvas" },
  { id: "TheRemovalOfTheMask", image: assetUrl("/Art/TheRemovalOfTheMask.jpeg"), title: "Removal of the Mask", date: "2022", dimensions: '16" x 20"', medium: "Acrylic on Canvas" },
  { id: "BinaryRepresentations", image: assetUrl("/Art/BinaryRepresentations.png"), title: "Binary Representations", date: "2023", dimensions: '12" x 16"', medium: "Oil on Canvas" },
]

export default artData
