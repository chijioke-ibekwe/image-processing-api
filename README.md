# Image Processing API
Image Processing API is an application that can be used to resize jpg images via a single API call. It is built using Node.js and Express as the web app framework.

## Getting Started
### Prerequisites
For running the application you need:
1. Node (v18.12.1 for a guaranteed successful run)

### Key Dependencies
1. Express
2. Sharp
3. Jasmine
4. Jasmine Spec Reporter
5. Supertest

## How to Run
To run the application locally:
- Clone the repository using the following command:
```
git clone https://github.com/<your-git-username>/image-processing-api.git
```
- Install the dependencies using:
```
npm install
```
- (Optional) Run the tests using:
```
npm run test
```
- Drop your target image in the directory `/images/full`:

- Run the app using any of the following commands:
```
node ./build/index.js

or

node ./build/index

or

node ./build/.
```

- Open your browser and go to the url `http://localhost:3000/api/images?filename=<filename>&width=<width>&height=<height>` with the specified parameters correctly filled out.
  - NB: 
    - `<filename>` represents the name of the target file you dropped in the `/images/full` directory, without the .jpg extension
    - `<width>` and `<height>` represent the desired width and height of the image in pixels, without the unit. E.g `250`

- Once the request is sent, the resized image will be rendered on the browser, and the image can be located in the `/images/thumbnails` directory of the project.

## Author
- Chijioke Ibekwe (https://github.com/chijioke-ibekwe)
