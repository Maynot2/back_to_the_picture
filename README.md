# [backtothepicture.me](backtothepicture.me)

# Context
This project has been made by
* Huy Nguyen
* Paul Manot
* Thibaut Bernard
#### :thinking: You might wondering what's back to the picture ? 
<i>Well, first, you need to thanks <b>Paul<b> to have bring up this idea.</i>
<br />
The idea of backtothepicture was
  * giving a platform for photographers to upload their pictures from an Event at a specific time and a specific place. <br />
  * And for users give the access to find pictures of them or whatever from a specific place/event at a specific time. 
<br />
 Imagine you are a surfer, you saw a lot of times photographers taking pictures of you and others while you surfing. You would love to have access to these pictures of you riding this wave, isn't it ? Well, backtothepicture give you the solution 🙂 

#### :exploding_head: Challenges of this project
The main challenge for all of us was learning new frameworks and technologies in order to be productive in less 4 weeks. <i>(We got 4 weeks to make this project)<i> <br />
The other challenge was to work together and be productive so in order to be productive, we obviously separate the work with trello and sometimes we worked in pair programming to learn together
  
#### :card_file_box: The stack
* Front-end
  - ReactJS
  - TailwindCSS
* Back-end
  - NodeJS
  - ExpressJS
  - Sequelize
  - PostgreSQL
* Hosting / Devops
  - AWS S3 bucket (upload pictures)
  - AWS EC2 (Container production)
 
* APIs
  - Auth0
  - AWS (S3 bucket)
  - Google Map (Places API, Maps JavaScript API, Geocoding api)
# :gear: Installation
* You need to be on ubuntu 20.04
* 1) Install all the prerequisite
  * Read the file instruction in config/setup
* 2) Create a .env file at the root of the folder back/api with inside it
  * AWSAccessKeyId=yourAccessKey
  * AWSSecretKey=youSecretKey
  * bucket=bucketName
* 3) Execute ``npm install`` at the root of back/api
* 4) Create a .env file at the root of the folder react_bttp with inside it
  * REACT_APP_GOOGLE_MAP_API_KEY=
  * REACT_APP_AUTH0_DOMAIN=
  * REACT_APP_AUTH0_CLIENT_ID=
* 5) Execute ``npm install`` at the root of react_bttp
* 6) Start the api and the react app
 
# :handshake:	Contribution
If you want to contribute, please contact one of us

# test the VM ==> GitHub ==> EC2 workflow
