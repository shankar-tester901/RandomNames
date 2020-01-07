# RandomNames
Functions as a Service Example using Zoho Catalyst

How does one make available APIs ?

That is where Zoho Catalyst comes to the rescue with Functions. 

Functions are Zoho Catalyst’s idiosyncratic view of Functions-as-a-Service.

Let us make a function that generates random names.

Remember, there is no client. We just need to invoke the APIs alone to test this.

So login to at catalyst.zoho.com and create a new project. Let us call it randomNames.

Now go to the command line and create a folder randomNames

Then cd to the randomNames folder.

Run catalyst init

Choose Functions

Choose the project randomNames

That is it

Now you will find a structure like this inside the randomNames folder.

catalyst.json
functions


cd functions



Now we have an empty folder. Now we need to create a folder for each API that we need to make.

So type as follows -



shankarr-0701@shankarr-0701 functions % catalyst functions:add



===> Functions Setup

 which type of function do you like to create ? (Use arrow keys)

❯ BasicIO 

  Event 

  Cron 





Choose BasicIO

 Which stack do you prefer to write your function? (Use arrow keys)

❯ node10 

  java8 



Choose node10



Now you will need to give the name of the API. Let us choose to give it as random_names.

Then just click on Enter for the rest and voila!, you have a folder with some default code ready.



catalyst-config.json
index.js
node_modules
package-lock.json
package.json



Now let us proceed to put some substance in our index.js file. This is the heart of the process. This will be the main file to be invoked as the API.

This is how it looks.





module.exports = (context, basicIO) => {

    /* 

        BASICIO FUNCTIONALITIES

    */

    basicIO.write('Hello from index.js'); //response stream (accepts only string, throws error if other than string)

    basicIO.getArgument('argument1'); // returns QUERY_PARAM[argument1] || BODY_JSON[argument1] (takes argument from query and body, first preference to query)

    /* 

        CONTEXT FUNCTIONALITIES

    */

    console.log('successfully executed basicio functions');

    context.close(); //end of application

};





A little explanation will be useful.



The input to the program is the context and basicIO parameters. 

Whatever you need to do, you have to refer these two parameters only. They are our two levers to change the world.





module.exports = (context, basicIO) => {

        const app = catalyst.initialize(context);



        let url = "https://uinames.com/api/?region=germany";





        try {

                request(url, function (err, response, body) {

                        if (err) {

                                basicIO.write("Error occured in fetching a random name" + err);

                                context.close();

                        } else {

                                let rand_Name = JSON.parse(body);

                                if (rand_Name == undefined) {

                                        basicIO.write("Error occured in getting a random name");

                                        context.close();

                                } else {

                                        basicIO.write(rand_Name.name + " " + rand_Name.surname + "... " + rand_Name.gender);

                                        dispatchEmail(rand_Name.name, rand_Name.surname);

                                        context.close();

                                }

                        }

                });

        } catch (err) {

                basicIOObj.write("Error in fetching name : " + err);

                context.close();

        }



        function dispatchEmail(firstname, lastname) {

                console.log('in dispatch email ');

                //Create a config object with the email configuration

                let config = {

                        from_email: 'shankarr+1002@zohocorp.com',

                        to_email: 'shankarr+1002@zohocorp.com',

                        subject: 'German Random Name Generated',

                        content: firstname + "-- " + lastname

                };



                //Send the mail by passing the config object to the method which in turn returns a promise

                let email = app.email();

                let mailPromise = email.sendMail(config);

                mailPromise.then((mailObject) => {

                        console.log(mailObject);

                });

        }

};









So let me explain the code. 



We are using the request module to make a call to uinames.com to get random names.

Once the random names are generated, we then send them as an email to shankarr+1002@zohocorp.com . Simple.



Now, as usual, since we are working on the heart of the system, we need to ensure that we get all the packages installed.

So go to randomNames folder and then install using npm install —-save request, catalyst-sdk-node.



Now let us test it. 

Again from randomNames folder . Run as the following and you will see the result



shankarr-0701@shankarr-0701 randomNames % catalyst functions:shell  



functions > random_names()

[cli] Function has been invoked



Xaver Winkler... male



in dispatch email 



[cli] Function execution complete



[response]

Xaver Winkler... male

[status]

200

functions > 





That is it.



Now we can deploy the function.

Again from the randomNames folder, run as the following - 

shankarr-0701@shankarr-0701 randomNames % catalyst deploy



ℹ functions(random_names): URL => https://randomnames-698833516.development.zohocatalyst.com/baas/v1/project/3296000000009001/function/random_names/execute

✔ functions(random_names): deploy successful





To test it, just run the  https://randomnames-698833516.development.zohocatalyst.com/baas/v1/project/3296000000009001/function/random_names/execute in a browser and you will see the response.


This is all you need to invoke to use as API anywhere.

I have also added a testset folder which contains the zip files you could use to test by invoking these as APIs.

