/**
 * @typedef {{ type: 'hero', image: string, alt?: string } |
 *   { type: 'text', body: string, heading?: string } |
 *   { type: 'code', snippet: string, language?: string, heading?: string } |
 *   { type: 'gallery', images: string[], heading?: string, captions?: string[], emptyMessage?: string } |
 *   { type: 'links', items: Array<{ label: string, href: string, description?: string }>, heading?: string } |
 *   { type: 'art-gallery', heading?: string }
 * } Section
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   categories: string[],
 *   geometryType: string,
 *   color: number,
 *   texture?: string,
 *   modelType?: 'obj' | 'gltf',
 *   hasModel?: boolean,
 *   modelFile?: string,
 *   modelScale?: number,
 *   rotationAxes?: {x?: boolean, y?: boolean, z?: boolean},
 *   initialRotation?: {x?: number, y?: number, z?: number},
 *   transform?: {x?: number, y?: number, z?: number},
 *   link?: string,
 *   sections?: Section[]
 * }} Project
 */

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^(public\/|\/)+/, '')}`

/** @type {Project[]} */
export const projects = [
  {
    id: 'cwf-site',
    title: 'Creative Works Fellowship',
    description: 'Creative Works Fellowship website, showcasing research and work exploring stewardship of Pacific Northwest watersheds through art, design, and technology.',
    categories: ['Technical', 'Design'],
    geometryType: 'icosahedron',
    modelType: 'gltf',
    modelScale: 5,
    rotationAxes: { x: false , y: false, z: false },
    initialRotation: { x: 0, y: 2.7, z: 0 },
    transform: { y: -1.5 },
    color: 0xe06050,
    link: 'https://ajm-l.github.io/cwf-site/',
  },
  {
    id: 'music-vae',
    title: 'MusicVAE',
    description: 'Variational Autoencoder for reconstructing mel-spectrograms of musical audio, exploring how neural networks learn sound structure.',
    categories: ['Technical'],
    geometryType: 'torus',
    modelType: 'gltf',
    modelScale: 0.5,
    color: 0x5090e0,
    link: 'https://github.com/AJM-L/MusicVAE',
  },
  {
    id: 'metal-renderer',
    title: 'Custom 3D Renderer',
    description: 'A real-time rendering pipeline using Apple Metal Graphics API using C++, implementing Blinn-Phong lighting, procedural sphere generation, and custom material presets.',
    categories: ['Technical'],
    geometryType: 'torusKnot',
    modelType: 'obj',
    modelScale: 0.25,
    color: 0xd070c0,
    link: 'https://github.com/AJM-L/RenderingEngine'
  },
  {
    id: 'yt-to-mp3',
    title: 'YT to MP3',
    description: 'A simple web application for converting YouTube videos to MP3 format.',
    categories: ['Technical'],
    geometryType: 'octahedron',
    modelType: 'gltf',
    modelScale: 10,
    color: 0x50c080,
    rotationAxes: { x: false },
    transform: { y: -0.5 },
    link: 'https://github.com/AJM-L/YtToMp3',
  },
  {
    id: 'graphite-ibm',
    title: 'Graphite Digital x IBM InstructLab',
    description: 'Designing a proof of concept for a synthetic data review platform that helps IBM teams review generated Q&A more collaboratively and with less friction.',
    categories: ['Design', 'Technical'],
    geometryType: 'dodecahedron',
    color: 0xe0a040,
    hasModel: true,
    modelType: 'gltf',
    modelScale: 0.2,
    sections: [
      {
        type: 'text',
        heading: 'About The Project',
        body: `InstructLab is an open-source IBM project for training and fine-tuning enterprise LLMs with synthetically generated data for Watsonx AI. Over two months, IBM partnered with Graphite Group to explore how review teams could more efficiently and collaboratively approve or deny generated Q&A pairs.

Within our six-person team, I focused on UI and UX for collaboration: wireframes, Figma components, interaction patterns, and user testing. My main area of ownership was the reviewer interaction layer, especially commenting, tagging, and handoff between teammates.`
      },
      {
        type: 'text',
        heading: 'The Problem',
        body: `InstructLab's synthetic data was largely being reviewed by technical internal teams, but the product direction pointed toward a broader enterprise audience, including less technical reviewers. The existing workflow was fragmented across files and the command line, with no shared best practices for ownership, review state, or collaboration.

Three pain points shaped the project:

• there was no standard review process or central review space
• reviewers were often unsure about decisions, leaving items partially reviewed
• collaboration was necessary, but the tooling did little to support it`
      },
      {
        type: 'text',
        heading: 'Design Priorities',
        body: `We framed the product around collaboration, efficiency, and brevity. The goal was not to create an overloaded review platform, but to make the core workflow easier to move through and easier to share with others when needed.

The concept centered on a few core interactions:

• list and modular views for fast scanning versus deeper review
• approve, deny, and edit actions for each Q&A pair
• lightweight commenting and teammate tagging
• inline access to the source reference document while fact-checking

My contribution was making collaboration feel native to the review flow rather than bolted on after the fact. I focused on how someone asks another reviewer to step in, how comment UI stays lightweight, and how those interactions remain understandable at a glance.`
      },
      {
        type: 'text',
        heading: 'Testing and Iteration',
        body: `After we built the high-fidelity prototype in Figma, I led a user testing session with IBM developers. Three patterns stood out quickly: review styles were highly individualized, reviewers depended heavily on the reference document, and modular view supported more confident decision-making than list view alone.

That feedback shaped the next round of design. We simplified commenting, made interaction states easier to follow, and improved access to the reference document so the interface matched how reviewers actually worked instead of how we initially imagined they might work.`
      },
      {
        type: 'text',
        heading: 'Outcome',
        body: `We presented the final concept to IBM stakeholders across UX, product, and development. The work opened up a clearer path for how synthetic data review could scale beyond ad hoc internal workflows and toward a more legible product experience for real teams.

One of the clearest responses came from Jacob Engelbrecht, a Backend IBM software engineer, who described it as “a big step forward” and “a large improvement” over their previous process.

The project also surfaced natural next steps around confidence scores, review metrics, and role-based task assignment. For me, its strongest contribution was making collaboration easier to understand, easier to navigate, and more natural inside the review flow itself.`
      },
    ],
  },
  {
    id: 'pinterest-dcgan',
    title: 'Pinterest DCGAN',
    description: 'Custom Pinterest pins using a Deep Convolutional Neural Network.',
    categories: ['Art', 'Technical'],
    geometryType: 'cone',
    hasModel: true,
    modelType: 'gltf',
    modelScale: 10,
    color: 0x7060e0,
    rotationAxes: { x: false },
    transform: { y: -0.5 },
    sections: [
      {
        type: 'text',
        heading: 'About The Project',
        body: `In order to take back some small bit of ownership over my data, I have developed a series of images based on my Pinterest profile and the profile of an anonymous friend who generously lent their profile.

This project consists of two parts, data collection and model training. In order to collect my data from Pinterest, I developed a web scraping tool that automatically gathers pins recommended to me based on my personal boards. Overall, I collected around 115 MB of image data (roughly 1,000 photos) from my own Pinterest account and a similar amount from my friend's account.

In order to display this data and create my own artwork, I developed a deep convolutional neural network (DCGAN) within Python using the open source machine learning library PyTorch. GANs and DCGANs are special kinds of generative machine learning algorithms that utilize two competing neural networks in order to create realistic looking synthetic data. DCGANs are a specific variant that utilizes convolutional layers, allowing for better image processing and generation capabilities.

I trained the network for 100-150 Epochs each and compiled an assortment of images into an 8x8 grid for display.`
      },
      {
        type: 'gallery',
        heading: 'Generated Image Grids',
        images: [assetUrl("public/projects/pinterest-dcgan/grid-01.png"), assetUrl("public/projects/pinterest-dcgan/grid-02.png")],
      },
    ],
  },
  {
    id: 'paintings',
    title: 'Paintings',
    description: 'A collection of paintings acrylic and oil on canvas.',
    categories: ['Art'],
    geometryType: 'cylinder',
    color: 0x40b0b0,
    hasModel: true,
    modelType: 'gltf',
    modelScale: 5,
    rotationAxes: { x: false, y: false, z: false },
    transform: { y: -2 },
    initialRotation: { x: 0, y: 2.7, z: 0 },
    sections: [
      { type: 'art-gallery' },
    ],
  },
];
