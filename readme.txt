/// I N D E X .J S  F I L E 
index.js files are only for importing the functions from other
files then giving those to where they are required.

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
BCRYPT LIBRARY THINGS...
bcrypt errors::::::::
Error: data must be a string or Buffer and 
salt must either be a salt string or a number of rounds...

///////////////////////////////////////////////////////
CALLBACK FUNCTIONS PATTERNS
callback function is a function we pass to another function as
argument. you can use callbacks anywhere you want but typically
they are used in Asyc functions where we need to wait for a 
task to complete.. then after its complete we use callback to
do the other things with result of that task...
for example in a database query we need to wait for the function
to get the user details(id,name,anything) we want from the database
 it will take some time so its an asynchronous function.. 
after the task is complete
we will use callback to show the result to user.. or anything we want.....
///////////////////////////////////////////////////////////////////////////

MUST READ ABOUT TRY AND CATCH 
they are awsome ti work..must learn more about them..


THINGS TO GROW APPLICATION INTO...
Middleware validation for email,password and other,,,
Nodemailer for email sending and other emailing work...
SMS sending work,, varification with OTP,,