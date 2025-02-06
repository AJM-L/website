import SpotifyImageGenImage from "./assets/Projects/SpotifyImageGenerator/VMXMXXV.jpg";
import FashionProductDCGANImage from "./assets/Projects/DCGANFashion/15EpochsSeed999 copy.png"
import ArtReccomendationImage from "./assets/Projects/PaintingReccomendation/Screenshot 2024-07-25 at 2.46.08 PM.png"
import MLPImage from "./assets/Projects/MLP/MLPImg.png"
import vPythonImage from "./assets/Projects/vPython3dGame/vpython.png"
import AntColonyImage from "./assets/Projects/AntColonySim/AntColonyImage.png"
import MandelbrotImage from "./assets/Projects/Mandelbrot/test.png"
import WireframeImage from "./assets/Projects/Wireframe/Wireframe.png"
import TicTacToeImage from "./assets/Projects/BoardGames/TicTacToeImage.png"
import PinterestImage from "./assets/Projects/PinterestScaper/PinterestHomepage.png"
import FakePins from "./assets/Projects/PinterestDCGAN/FakePins.png"
import PDfReader from "./assets/Projects/PdfReader/PDFReader.png"
import IBMImage from "./assets/Projects/InstructlabUI/InstructlabUI.png"


import Python from "./assets/TechIcons/Python.svg"
import Jupyter from "./assets/TechIcons/Jupyter.svg"
import Spotify from "./assets/TechIcons/Spotify.svg"
import OpenAI from "./assets/TechIcons/openai-svgrepo-com.svg"
import PyTorch from "./assets/TechIcons/PyTorch.svg"
import Kaggle from "./assets/TechIcons/Kaggle.svg"
import Flask from "./assets/TechIcons/Flask.svg"
import HTML5 from "./assets/TechIcons/HTML5.svg"
import ReactIcon from "./assets/TechIcons/React.svg"


// Helper function to create a project entry
const createProject = ({
    id,
    title,
    githubLink = "https://github.com/AJM-L/",
    pageLink = "",
    date = "",
    image,
    shortDescription = "",
    longDescription = [],
    techStack = []
}) => ({
    id,
    title,  
    githubLink,
    pageLink,
    date,
    image,
    shortDescription,
    longDescription,
    techStack
});

const createDescription = (paragraphs) => 
    paragraphs.map((text, index) => ({
        id: `p${index + 1}`,
        para: text
    }));

/*
createProject({
        id: "",
        title: "",
        githubLink: "",
        date: "",
        image: ,
        shortDescription: "",
        longDescripton: createDescription([
            "",
            ""
        ]),
        techStack: []
    }),
*/

const projectData = [
    createProject({
        id: "IBMProject",
        title: "UI/UX for IBM",
        githubLink: "https://docs.google.com/document/d/e/2PACX-1vS3lyGh1WkQx54Zx716ODNEIC0i775_aPzFb80bzxbeVAKjYzIjMOzO6SDA4ZU4ksVxOMJMcDAO7pi5/pub",
        date: "October-December 2024",
        image: IBMImage,
        shortDescription: "UI/UX for IBM's Instructlab",
        longDescripton: createDescription([
            "Collaborated on a 2-month project with a cross-functional team to design and prototype a collaborative data review tool for IBM's InstructLab, improving efficiency and consistency in reviewing synthetic datasets for enterprise-level AI training.",
            "Conducted user research and testing with IBM developers, resulting in a solution that streamlined workflows, enhanced team collaboration, and addressed critical pain points, reducing model training setbacks."
        ]),
        techStack: []
    }),
    createProject({
        id: "EasyPdfReader",
        title: "PDF Reader App",
        githubLink: "https://easydocumentreader.com",
        date: "September-November 2024",
        image: PDfReader,
        shortDescription: "PDF Reader application with lifelike text-to-speech, Azure OCR, and user authentication.",
        longDescription: createDescription([
            "For a school club project in collaboration with the AI company LMNT, I developed a web application using Python and JavaScript, with Flask for the backend and React for the frontend. The backend is hosted on Heroku, while the frontend is deployed on Netlify.",
            "The application enables users to upload PDFs, which are converted to text using Azure Web Services' OCR technology. The text is then processed through a text-to-speech API to create audio playback. Additionally, users can save and download the generated audio files for offline use.",
            "This project strengthened my skills in deployment, database management, backend/frontend integration, user authentication, and leveraging Azure Web Services.",
            "The app is live at easydocumentreader.com"
        ]),
        techStack: [Flask, Python, ReactIcon]
    }),
    createProject({
        id: "PersonalizedPinDCGAN",
        title: "Personalized Pinterest Pin DCGAN",
        pageLink:"#/projects/pinterestgan",
        date: "July, 2024",
        image: FakePins,
        shortDescription: "Custom pinterest pins using a Deep Convolutional Neural Network.",
        longDescription: createDescription([
            "Combining my previous projects of a DCGAN and Pinterest web scraper, I created a set of synthetic images based on my own pinterest data. Given my computational restraints (I don't have millions of dollars for GPUs) my images are far from realistic. However, I am happy with the progress of my model.",
            "I love that these images I produced have a mathematical relationship to my own preferences and choioces. Through my pinterest preferences, I created a dataset that could be used to train a GAN. Subsequently, these images contain information about my own preferences and existence."
        ]),
        techStack: [Python, PyTorch]
    }),
    createProject({
        id: "PinterestWebScraper",
        title: "Pinterest Web Scraper",
        githubLink: "https://github.com/AJM-L/PinterestScraper",
        date: "July, 2024",
        image: PinterestImage,
        shortDescription: "Python and Selenium program to download public pinterest pins.",
        longDescription: createDescription([
            "For this project, I wrote a Python script that uses selenium to download pinned images from a given pinterest user. The script downloads every public image from the user sorting each board into folders.",
            "Through this project, I learned about web scraping use cases, practices, and methods. I created file management systems and bypassed lazyloading while maintaining high content downlaod speed."
        ]),
        techStack: [Python]
    }),
    createProject({
        id: 1,
        title: "Spotify Cover Generator",
        githubLink: "https://github.com/AJM-L/Spotify-Playlist-Image-and-Name-Generator",
        date: "July, 2024",
        image: SpotifyImageGenImage,
        shortDescription: "Uses Spotify and OpenAI APIs to generate unique cover art for users",
        longDescription: createDescription([
            "Python script using Spotify and OpenAI APIs. User simply uploads their API keys, spotify account info, then selects a playlist, and the program automatically gathers relevant information and produces a relevant cover image using OpenAIs GPT and Dall-E models.",
            "Learned about API keys, documentation, requests, and use cases. Future steps for this project would be implementing a front end, user managemement and security, API key management, and deploy the project for users."
        ]),
        techStack: [Python, Jupyter, Spotify, OpenAI]
    }),
    createProject({
        id: 3,
        title: "Art Reccomendation App",
        githubLink: "https://github.com/AJM-L/painting-recommendation",
        date: "July, 2024",
        image: ArtReccomendationImage,
        shortDescription: "Implements image vectorization, cosine similarity, and an image classification CNN to reccomend art to users from an uploaded image.",
        longDescription: createDescription([
            "I love painting and taking inspiration from other artists, but it can be difficult to find art with similar styles to my own. To help solve this problem, I created an art reccomendation app where I can upload a picture of a piece of art I made or like, and the app will show pieces similar to the one given and return an artist with a similar style.",
            "The app is written in Python, using the Flask web framework. It includes a database of paintings from Kaggle and uses image vectorization and cosine similarity to serve similar images and a CNN image classifier to reccomend similar artists."
        ]),
        techStack: [Python, Flask, PyTorch, HTML5]
    }),
    createProject({
        id: 2,
        title: "Fashion Product DCGAN",
        githubLink: "https://github.com/AJM-L/DCGAN-Fashion-Product",
        date: "July, 2024",
        image: FashionProductDCGANImage,
        shortDescription: "Generative AI using PyTorch deep convolutional generative adversarial network and fashion product dataset to create synthetic fashion product images",
        longDescription: createDescription([
            "Deep Learning Jupyter Notebook implementing a Deep Convolutional Generative Adversarial Network using PyTorch. I trained the model on a fashion product image dataset from Kaggle. The synthetic images clearly resembled",
            "Learned how to use PyTorch for creating synthetic data, building generators and discriminators, and parameter tuning DCGANs. To expand this project, I want to curate a dataset toward my personal taste and create a set of synthetic images from that set."
        ]),
        techStack: [Python, Jupyter, PyTorch, Kaggle]
    }),
    createProject({
        id: 4,
        title: "Neural Network (MLP)",
        githubLink: "https://github.com/AJM-L/Neural-Network",
        date: "",
        image: MLPImage,
        shortDescription: "",
        longDescription: createDescription([
            "For my final machine learning project senior year of high school, I decided to build my own neural network. I am very interested in the structures of mathematical learning and wanted to bolster my understanding by coding a basic neural network myself. I built a sigmoidal feedforward network using back-propagation, the network is implemented as a class and can be used to learn any  dataset. I used it to classify handwritten digits from the MNIST dataset with >90% accuracy.",
            "I did not use any machine learning libraries, but I relied heavily on numpy for the matrix operations. In the future I would expand on this project by adding more customizability, different models, and more optimization."
        ]),
        techStack: []
    }),

    createProject({
        id: 5,
        title: "vPython 3d Game",
        githubLink: "https://www.glowscript.org/#/user/amatheson53/folder/MyPrograms/program/FinalGame",
        date: "March, 2024",
        image: vPythonImage,
        shortDescription: "",
        longDescription: createDescription([
            "This is a game I created using vPython. The goal of the game is to push as many green balls into the center ring while preventing red balls from entering. You win if you score more green balls than red balls. The game ends when half the balls have been put in the goal. You can achieve a perfect game by letting in all the green balls and no red balls; however, this is easier said than done. To create the game, I had to implement collision physics and user controls."
        ]),
        techStack: [Python]
    }),
    createProject({
        id: 6,
        title: "Ant Colony Simulation",
        githubLink: "https://github.com/AJM-L/AntColony",
        date: "",
        image: AntColonyImage,
        shortDescription: "",
        longDescription: createDescription([
            "For this project, I played with idea of a digital ant colony. The ants begin at their nest and search out in random paths looking for food. Once they find food they release a pheromone that attracts  other ants and then return to their nest. The food automatically regenerates pseudo-randomly around existing nodes, and the simulation continues until it is manually stopped."
        ]),
        techStack: [Python]
    }),
    createProject({
        id: 7,
        title: "Mandelbrot Set",
        githubLink: "https://github.com/AJM-L/Mandelbrot",
        date: "",
        image: MandelbrotImage,
        shortDescription: "",
        longDescription: createDescription([
            "These are the images I created using the logic of the Mandelbrot set. The Mandelbrot set is a set of numbers in the complex plane C that remain bounded upon iterative application of the mandelbrot function. My script is able to render any discreet section of the mandelbrot set and supply the user with a jpg image file."
        ]),
        techStack: [Python]
    }),
    createProject({
        id: 8,
        title: "3d Wireframe Graphics Engine",
        githubLink: "https://github.com/AJM-L/3dGraphRenderings",
        date: "",
        image: WireframeImage,
        shortDescription: "",
        longDescription: createDescription([
            "Moving visualization of a 3 dimensional graph. I wanted to understand 3d graphics, so I programmed my own visualization software in pygame. It can take any 3d graph and rotate or move it in space. I have included examples of a simple rotating cube, and a random minimum spanning tree that I constructed by generating a random graph and running prims algorithm to construct its MST.",
            "My program can display and rotate any 3-d graph and provides preset functions for displaying cubes, generating random graphs, and running various graph search and pruning algorithms. I used this opportunity to visualize several graph search and optimization algorithms including Kosaraju's algorithm, BFS and DFS, and prims algorithm (see image)."
        ]),
        techStack: [Python]
    }),
    createProject({
        id: 9,
        title: "Board Games",
        githubLink: "https://github.com/AJM-L",
        date: "",
        image: TicTacToeImage,
        shortDescription: "",
        longDescription: createDescription([
            "In order to practice my board game skills, I implemented recursive MinMax algorithms on tic tac toe and connect 4. My tic tac toe algorithm produces a win or a tie every time, and I have never beaten my connect 4 algorithm (however, it is not unbeatable). Both games are implemented using python and with a UI in the terminal."
        ]),
        techStack: [Python]
    }),
];

export default projectData;