# CoinTrackerApp
TakeHome Exam for CoinTracker

# Reference Documentation for project

# How to run the project

## Backend Configuration
   - The project runs with Tomcat version 8.5.0, which can be installed from https://tomcat.apache.org/tomcat-8.5-doc/index.html.
   - The java version used for the project is Java 8
   - The maven version used for the project is Maven 2.2.5
   - I have also used lombok for annotations for testing and creating bean classes, and its version is 1.18.24 and downloaded the dependency from 
     https://projectlombok.org/setup/maven and added it to pom.xml, as I used STS toolkit for running the application, 
   - if working with Intellij Idea Ultimate, this can be skipped as it already provides all necessary dependencies
   - In case of using STS toolkit, it can be downloaded from here: https://spring.io/tools/, it works with eclipse editor to edit the java code for spring MVC.
   - With STS toolkit, when I create a new project or import a project with existing dependencies in pom.xml, it automatically downloads all dependencies in buildpath.
   - The project is to be imported as a Maven Project.
   - In case Java 8 is not in buildpath, it can be added by right clicking project -> Build Path -> Configure -> Add External Jars
   - To run the project on Tomcat version 8.5.0, I extracted the jar downloaded in step 1 and then in the bottom of the window. Next follow these steps:
  		1. Open the server view via Window -> View -> Server -> Servers
  		2.Create Tomcat 8.5 Runtime Environment in STS/Eclipse via Preferences -> Server -> Runtime Environments
  		3. Then when creating server instance via the Server view select the Tomcat 8.5 runtime environment.
  		4.More detailed instructions can be obtained from this site: https://turbofuture.com/computers/How-to-install-Apache-tomcat-in-Spring-Tool-Suite-Eclipse
  - Once all the dependencies are in place, the project can be run as right click -> Run as spring boot app
  - By default the project runs on localhost 8080
  
## Frontend Configuration
 - The frontend of the project is built using angular-8 and is in a seperate package named CoinTrackerApp-> cointrackerapp
 - The server runs at localhost 4200 using npm start command
 
## Database
- The database is created using PostgreSQL PgAdmin 4 tool, where I created a server and then database named wallet inside it
- The PostgreSQL can be downloaded from here: https://www.postgresql.org/download/
- The PgAdmin tool which I used for creating database can be downloaded from here: https://www.pgadmin.org/download/

