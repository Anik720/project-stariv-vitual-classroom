#  To run this project 1st install all the dependencies and then run the command npm run start  (Note: you need to have nodemon installed)


1)Admin Login:  https://virtual-classroom-appp.herokuapp.com/api/v1/users/login        in this url a user have to login which will be a post request in postman……

For admin login the credentials is: 
"email":"kibria@gmail.com",
"password":"12345678"





After login a token will be generated which you can see in the response and that token you have to set in header as a key value pair. Key will be Authorization and value will Bearer token(which come into the response) 

2) create teacher: https://virtual-classroom-appp.herokuapp.com/api/v1/teacher       in this url admin can create a teacher which will be a post request in postman. How to create a teacher a demo is shown below :

"name":"Kadir",
"email":"kadir@gmail.com",
"role":"teacher"

After creating a teacher a auto generated code willbe saved into the code field in the model and this will be emailed to the teacher. 
In the same url by get request admin can see all the teacher.
3) teacher login: https://virtual-classroom-appp.herokuapp.com/api/v1/users/login in this url a teacher have to login which will be a post request in postman. The way he need to put the credentials is shown below:

"email":"kadir@gmail.com",
"password":"ToI(QJjsnSegZ"

In the password field he need to put the code which was emailed him
.
After login a token will be generated which you can see in the response and that token you have to set in header as a key value pair. Key will be Authorization and value will Bearer token(which come into the response)

4) create classrooms: https://virtual-classroom-appp.herokuapp.com/api/v1/classroom in this url a teacher can create a classroom which will be a post request in postman .  Demo data is shown shown below to create a class: 
"teacher":"Karim",
"subject":"Math"


After creating a class a code will be created which you can see into the response ("code": "vw(F7!%fAdbRg")
. By using this code students will be able to enroll into the class. And intially the assignment and the exam field will be empty. After creating the assignment and the exam a patch request will be held into the particular classroom.

5) create a assignment: https://virtual-classroom-appp.herokuapp.com/api/v1/assignment for creating a assignment a teacher to give a post request in this url. Demo data is provided below which way need to put:

  "deadlines": "27/04/22",
    "lastSubmitTime": "12.30",
    "marks": 100

After creating a assignment teacher need to update that particular class. How to update that is shown below: 
  The url will be : https://virtual-classroom-appp.herokuapp.com/api/v1/classroom/ (id of the particular class)

Demo data: 
 
"assignment":["62686cc840a0760016187738"]
the assignment field is provided by the id of that created exam.
After successfully completing this you can see that the assignment field of that classroom is populated with that assignment data.


6) create exam: https://virtual-classroom-appp.herokuapp.com/api/v1/exam for creating a exam a teacher to give a post request in this url. Demo data is provided below which way need to put:

  "deadlines": "27/04/22",
    "lastSubmitTime": "12.30",
    "marks": 100

After creating a exam teacher need to update that particular class. How to update that is shown below: 
  The url will be : https://virtual-classroom-appp.herokuapp.com/api/v1/classroom/ (id of the particular class)

Demo data: 
"exams":["6268706140a0760016187782"]

the exam field is provided by the id of that created exam.
After successfully completing this you can see that the exam field of that classroom is populated with that exam data.


6) post results: https://virtual-classroom-appp.herokuapp.com/api/v1/result for creating results teacher have to give a post  request in this url. 




Demo data:
 "name": "Math",
    "marks": 100,
    "assignmentResult":["62686cc840a0760016187738"],
    "examResult" :["6268706140a0760016187782"]


In the assignmentResult and in the examResult field you need to provide the id of that particular assignment or the exam. When the assignmentresult  is posted the examResult field will be empty or when the exam result will be posted the assignmentResult field  will be empty.

Now when a teacher Gives a get  request of the he can see the result of that particular assignment or the exam because of the virtual populated is integrated in the backend.

7) Student Login: https://virtual-classroom-appp.herokuapp.com/api/v1/users/signup in this url a student have to signup for enrolled in a class. The data which he need to provide is shown below: 

  "code":"vw(F7!%fAdbRg",
  "name":"Shohan",
  "email":"shohan@gmail.com",
  "schoolId":"12",
  "password":"12345678",
  "enrollclass":["626869c840a0760016187703"]
 

He need to provide the class code correctly and then he have to create an email and a password for login and finally in the enrollclass field the particular class’s id need to be given.After that the student will be subscribed to that class. If you give a get request to the server to see the all the class then you will be able to see all the students that are enrolled to that class.

After login or signup  a token will be generated which you can see in the response and that token you have to set in header as a key value pair. Key will be Authorization and value will Bearer token(which came into the response)

For seeing the upcoming exam: https://virtual-classroom-appp.herokuapp.com/api/v1/student/62687e1040a0760016187892/upcoming 

In this url a student need to give a get request to see the upcoming exam.In the url  After student/ id need to be provide of that particular student.


submit answers: https://virtual-classroom-appp.herokuapp.com/api/v1/student/62687e1040a0760016187892  for submitting the answers it will a patch request . Students can upload images or pdf as their answer.


Curated result:  https://virtual-classroom-appp.herokuapp.com/api/v1/student/62687e1040a0760016187892/curated for getting the curated result student need to give a get request to this url.

cron/scheduler to notify students: This part is implemented at app.js file
