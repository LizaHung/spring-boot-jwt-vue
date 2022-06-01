# spring-boot-jwt-vue

This simple project is about pet adoption management system and was created to demonstrate a full stack application. 
The [back-end](https://github.com/LizaHung/spring-boot-jwt-authentication) server uses Spring Boot with Spring Security for JWT authentication and Spring Data JPA. 
Generating an application as a PDF document using iText7.
The front-end using Vue with Vuex for state management and axios.       

> *The access token will expire 30 minutes after being generated, and the front-end uses axios interceptor to catch access token has expired response and automatically sends refresh token request to renew the access Token.*  





## Technology

|               | Technology    |
| ------------- |:-------------:|
| [Backend](https://github.com/LizaHung/spring-boot-jwt-authentication)       | SpringBoot (Java)     |
| Security      | Spring Security, JWT     |
| Database      | H2 Database     |
| Frontend      | vue.js 2、vuex、axios、vue-router    | 



## Running Locally    


### Prerequisites    


> **To send an email using gmail smtp, please visit: https://www.google.com/settings/security/lesssecureapps and enable "Allow less secure applications".**


### Get started with Docker Compose     

1. Download project repository to your local directory.
```
git clone https://github.com/LizaHung/spring-boot-jwt-vue.git
```

2.  Start your docker machine and connect your shell to the machine.
```
docker-machine start xxx
```

3. Get the host IP address and mark it down for step 5.
```
docker-machine ip xxx
```

4. Going into the root of spring-boot-jwt-vue directory which contains the docker-compose.yml and 
passing your email address and password in the command below. Compose will start and run entire app.
```
MAIL_PASSWORD=xxxx EMAIL=xxxx@gmail.com docker-compose up --build
```
5. Passing your host ip address from step 3 with 9001 port to visit front-end login page. 
```
host IP address:9001
```

### Another way to run this project.

* back-end:

Run a jar file and fill in your email address and password in the command below. 

```
java -Dfile.encoding=UTF-8  -jar ./backend/adoption-0.0.2-SNAPSHOT.jar  --MAIL_PASSWORD=xxxx  --EMAIL=xxxx@gmail.com
```


* front-end:

1. Open your terminal in local project, and execute:

```
npm install
npm run serve
```

2. Visit front-end login page: http://localhost:80